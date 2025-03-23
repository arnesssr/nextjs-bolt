import { type NextRequest, NextResponse } from 'next/server';
import { MAX_RESPONSE_SEGMENTS, MAX_TOKENS } from '@/lib/llm/constants';
import { getSystemPrompt } from '@/lib/llm/prompts';
import { streamText, type StreamingOptions } from '@/lib/llm/stream-text';
import SwitchableStream from '@/lib/llm/switchable-stream';
import { type Provider } from '@/lib/stores/provider';
import { Message } from 'ai';

export const runtime = "edge";

interface ChatRequest {
  messages: Message[];
  context: string;
  provider: Provider;
}

// Define strict message types to match AI package expectations
type MessageRole = 'system' | 'user' | 'assistant';

interface ChatMessage {
  role: MessageRole;
  content: string;
}

export async function POST(req: Request) {
  const { messages, context, provider } = await req.json() as ChatRequest;

  // Convert messages to the correct format
  const formattedMessages: ChatMessage[] = messages.map(msg => ({
    role: msg.role as MessageRole,
    content: typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content)
  }));

  const systemMessage: ChatMessage = {
    role: 'system',
    content: `${getSystemPrompt()}

### Knowledge Base Context ###
${context}`
  };

  const enhancedMessages: ChatMessage[] = [systemMessage, ...formattedMessages];

  const stream = new SwitchableStream();
  const startTime = Date.now();

  try {
    const options: StreamingOptions = {
      toolChoice: 'none',
      onFinish: async ({ text: content, finishReason }) => {
        if (finishReason !== 'length') {
          return stream.close();
        }

        if (stream.switches >= MAX_RESPONSE_SEGMENTS) {
          throw Error('Cannot continue message: Maximum segments reached');
        }

        const switchesLeft = MAX_RESPONSE_SEGMENTS - stream.switches;
        console.log(`Reached max token limit (${MAX_TOKENS}): Continuing message (${switchesLeft} switches left)`);

        const updatedMessages: ChatMessage[] = [
          ...enhancedMessages,
          { role: 'assistant', content }
        ];

        const result = await streamText({ 
          messages: updatedMessages, 
          provider, 
          ...options 
        });

        return stream.switchSource(result.toDataStream());
      },
    };

    const result = await streamText({ 
      messages: enhancedMessages, 
      provider,
      ...options 
    });

    stream.switchSource(result.toDataStream());

    const endTime = Date.now();
    const executionTime = endTime - startTime;
    console.log(`API execution time: ${executionTime}ms`);

    return new NextResponse(stream.readable, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  } catch (error: any) {
    console.error(error);
    return new NextResponse(null, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }
}
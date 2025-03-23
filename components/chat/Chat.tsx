import { useStore } from '@nanostores/react';
import type { Message } from 'ai';
import { useChat } from 'ai/react';
import { useAnimate } from 'framer-motion';
import { memo, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { cssTransition, toast, ToastContainer } from 'react-toastify';
import { useMessageParser, usePromptEnhancer, useShortcuts, useSnapScroll } from '@/hooks';
import { useChatHistory } from '@/persistance';
import { chatStore } from '@/lib/stores/chat';
import { workbenchStore } from '@/lib/stores/workbench';
import { fileModificationsToHTML } from '@/utils/diff';
import { cubicEasingFn } from '@/utils/easings';
import { providerStore } from '@/lib/stores/provider';
import { createScopedLogger, renderLogger } from '@/utils/logger';
import { BaseChat } from '@/components/chat/BaseChat';
import { useParams } from 'next/navigation';
import { debounce } from '@/utils/debounce';
import { useToast } from '@/hooks/use-toast';
import { Check, WarningCircle } from '@phosphor-icons/react';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useKnowledgeBase } from '@/features/knowledge-base/hooks/useKnowledgeBase';
import { getSystemPrompt } from '@/lib/llm/prompts';

const toastAnimation = cssTransition({
  enter: 'animated fadeInRight',
  exit: 'animated fadeOutRight',
});

const logger = createScopedLogger('Chat');

export default function Chat() {
  renderLogger.trace('Chat');
  const { id } = useParams();
  const parsedId = Array.isArray(id) ? id[0] : id;
  const { ready, initialMessages, storeMessageHistory } = useChatHistory(parsedId);

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        {ready && <ChatImpl initialMessages={initialMessages} storeMessageHistory={storeMessageHistory} />}
        <ToastContainer
          closeButton={({ closeToast }) => {
            return (
              <button className="Toastify__close-button" onClick={closeToast}>
                <div className="i-ph:x text-lg" />
              </button>
            );
          }}
          icon={({ type }) => {
            /**
             * @todo Handle more types if we need them. This may require extra color palettes.
             */
            switch (type) {
              case 'success': {
                return <Check className="text-green-500 text-2xl" />;
              }
              case 'error': {
                return <WarningCircle className="text-destructive text-2xl" />;
              }
            }

            return undefined;
          }}
          position="bottom-right"
          pauseOnFocusLoss
          transition={toastAnimation}
        />
      </div>
    </div>
  );
}

interface ChatProps {
  initialMessages: Message[];
  storeMessageHistory: (messages: Message[]) => Promise<void>;
}

export const ChatImpl = memo(({ initialMessages, storeMessageHistory }: ChatProps) => {
  useShortcuts();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const baseChatRef = useRef<HTMLDivElement>(null);
  const actionAlert = useStore(workbenchStore.alert);
  const [chatStarted, setChatStarted] = useState(initialMessages.length > 0);
  const { showChat } = useStore(chatStore);
  const [animationScope, animate] = useAnimate();
  const provider = useStore(providerStore);
  const { toast } = useToast();
  const { getContextForPrompt } = useKnowledgeBase();

  const { messages, isLoading, input, handleInputChange, setInput, stop, append } = useChat({
    api: '/api/chat',
    onError: (error) => {
      logger.error('Request failed\n\n', error);
      toast({
        variant: 'destructive',
        title: 'There was an error processing your request',
        description: error.message,
      });
    },
    onFinish: () => {
      logger.debug('Finished streaming');
    },
    initialMessages,
    body: {
      provider: provider,
      context: getContextForPrompt(), // This context will be injected into the prompt
    },
  });

  const { enhancingPrompt, promptEnhanced, enhancePrompt, resetEnhancer } = usePromptEnhancer();
  const { parsedMessages, parseMessages } = useMessageParser();

  const TEXTAREA_MAX_HEIGHT = chatStarted ? 400 : 200;

  const debouncedParseMessages = useCallback(
    debounce((messages, isLoading) => {
      parseMessages(messages, isLoading);
    }, 300), // Adjust the delay as needed
    []
  );

  const previousMessages = useRef<Message[]>(initialMessages);

  useEffect(() => {
    debouncedParseMessages(messages, isLoading);

    if (
      messages.length > initialMessages.length &&
      JSON.stringify(messages) !== JSON.stringify(previousMessages.current)
    ) {
      storeMessageHistory(messages).catch((error) =>
        toast({
          variant: 'destructive',
          title: error.message,
        })
      );
      previousMessages.current = messages;
    }
  }, [messages, isLoading, storeMessageHistory]);

  const scrollTextArea = () => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.scrollTop = textarea.scrollHeight;
    }
  };

  const abort = () => {
    stop();
    chatStore.setKey('aborted', true);
    workbenchStore.abortAllActions();
  };

  const debouncedSetTextareaHeight = useCallback(
    debounce(() => {
      const textarea = textareaRef.current;

      if (textarea) {
        textarea.style.height = 'auto';

        const scrollHeight = textarea.scrollHeight;

        textarea.style.height = `${Math.min(scrollHeight, TEXTAREA_MAX_HEIGHT)}px`;
        textarea.style.overflowY = scrollHeight > TEXTAREA_MAX_HEIGHT ? 'auto' : 'hidden';
      }
    }, 100),
    [textareaRef, TEXTAREA_MAX_HEIGHT]
  );

  useEffect(() => {
    debouncedSetTextareaHeight();
  }, [input, debouncedSetTextareaHeight]);

  const runAnimation = async () => {
    if (chatStarted) {
      return;
    }

    const introElement = document.querySelector('#intro');
    const examplesElement = document.querySelector('#examples');

    //TODO: fix or remove this
    {/*if (!introElement || !examplesElement) {
      return;
    }*/}

    chatStore.setKey('started', true);

    setChatStarted(true);
  };

  const sendMessage = async (
    _event: React.UIEvent,
    messageInput?: string,
    imagePreview?: { imageUrl?: string | null; imageName?: string | null; imageSize?: number | null } | null | undefined
  ) => {
    const _input = messageInput || input;

    if (_input.length === 0 || isLoading) {
      return;
    }

    /**
     * @note (delm) Usually saving files shouldn't take long but it may take longer if there
     * many unsaved files. In that case we need to block user input and show an indicator
     * of some kind so the user is aware that something is happening. But I consider the
     * happy case to be no unsaved files and I would expect users to save their changes
     * before they send another message.
     */
    await workbenchStore.saveAllFiles();

    const fileModifications = workbenchStore.getFileModifcations();

    chatStore.setKey('aborted', false);

    runAnimation();

    if (fileModifications !== undefined) {
      const diff = fileModificationsToHTML(fileModifications);

      /**
       * If we have file modifications we append a new user message manually since we have to prefix
       * the user input with the file modifications and we don't want the new user input to appear
       * in the prompt. Using `append` is almost the same as `handleSubmit` except that we have to
       * manually reset the input and we'd have to manually pass in file attachments. However, those
       * aren't relevant here.
       */
      append({
        role: 'user',
        content: `${diff}\n\n${_input}`,
        data: imagePreview
          ? {
              url: imagePreview.imageUrl as string,
              name: imagePreview.imageName as string,
              size: imagePreview.imageSize as number,
            }
          : undefined,
      });

      /**
       * After sending a new message we reset all modifications since the model
       * should now be aware of all the changes.
       */
      workbenchStore.resetAllFileModifications();
    } else {
      const data = imagePreview
        ? {
            url: imagePreview.imageUrl as string,
            name: imagePreview.imageName as string,
            size: imagePreview.imageSize as number,
          }
        : undefined;

      append({ role: 'user', content: _input, data: data });
    }

    setInput('');

    resetEnhancer();

    textareaRef.current?.blur();
  };

  const [messageRef, scrollRef] = useSnapScroll();

  const { isListening, startListening, stopListening } = useSpeechRecognition();

  const handleVoiceInput = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening((transcript) => {
        setInput(transcript);
      });
    }
  }, [isListening, startListening, stopListening, setInput]);

  return (
    <BaseChat
      textareaRef={textareaRef}
      input={input}
      showChat={showChat}
      chatStarted={chatStarted}
      isStreaming={isLoading}
      enhancingPrompt={enhancingPrompt}
      promptEnhanced={promptEnhanced}
      sendMessage={sendMessage}
      messageRef={messageRef}
      scrollRef={scrollRef}
      handleInputChange={handleInputChange}
      isListening={isListening}
      onVoiceInput={handleVoiceInput}
      handleStop={abort}
      messages={messages.map((message, i) => {
        if (message.role === 'user') {
          return {
            ...message,
            content: (
              <>
                {message.content}
                {typeof message.data === 'object' && message.data !== null && 'url' in message.data && (
                  <img
                    src={message.data.url as string}
                    alt="User uploaded image"
                    className="max-h-32 max-w-32 object-contain rounded-md mt-2"
                  />
                )}
              </>
            ),
          };
        }

        return {
          ...message,
          content: (parsedMessages[i] || '') as string,
        };
      })}
      enhancePrompt={() => {
        enhancePrompt(input, (input: SetStateAction<string>) => {
          setInput(input);
          scrollTextArea();
        });
      }}
      actionAlert={actionAlert}
      clearAlert={() => workbenchStore.clearAlert()}
    />
  );
});
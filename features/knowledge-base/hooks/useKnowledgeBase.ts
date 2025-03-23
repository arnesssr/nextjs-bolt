import { useStore } from '@nanostores/react';
import { knowledgeBaseStore, knowledgeBaseActions } from '../stores/knowledge-store';
import { defaultPractices, frameworkStructures } from '../data/software-practices';

type SupportedFrameworks = keyof typeof frameworkStructures;

export function useKnowledgeBase() {
  const state = useStore(knowledgeBaseStore);

  const getContextForPrompt = () => {
    if (!state.aiContext.enabled) return '';

    let context = '### Software Engineering Context ###\n\n';

    // Check if framework is a valid supported framework
    if (state.activeFramework && 
        (Object.keys(frameworkStructures) as SupportedFrameworks[]).includes(state.activeFramework as SupportedFrameworks)) {
      const framework = state.activeFramework as SupportedFrameworks;
      context += `🔧 Framework: ${framework}\n`;
      context += `${frameworkStructures[framework].content}\n\n`;
    }

    // Second: Project Requirements (if any)
    if (state.projectRequirements.length > 0) {
      context += '📋 Project Requirements:\n\n';
      state.projectRequirements.forEach(req => {
        context += `Title: ${req.title}\n`;
        context += `Description: ${req.description}\n`;
        if (req.framework) context += `Framework: ${req.framework}\n`;
        if (req.architecture) context += `Architecture: ${req.architecture}\n`;
        context += `Requirements:\n${req.specificRequirements}\n\n`;
      });
    }

    // Third: Software Engineering Best Practices
    if (state.aiContext.useDefaultPractices) {
      context += '📚 Engineering Best Practices:\n\n';
      defaultPractices.forEach(practice => {
        context += `${practice.title}:\n${practice.content}\n\n`;
      });
    }

    // This context is now being passed to the LLM through the Chat component
    // in the useChat hook's body parameter
    return context;
  };

  return {
    practices: defaultPractices,
    aiContext: state.aiContext,
    updateAIContext: knowledgeBaseActions.updateAIContext,
    getContextForPrompt,
    projectRequirements: state.projectRequirements,
    addProjectRequirement: knowledgeBaseActions.addProjectRequirement
  };
}

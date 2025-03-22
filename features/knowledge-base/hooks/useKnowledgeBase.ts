import { useStore } from '@nanostores/react';
import { knowledgeBaseStore, knowledgeBaseActions } from '../stores/knowledge-store';
import { defaultPractices } from '../data/software-practices';

export function useKnowledgeBase() {
  const state = useStore(knowledgeBaseStore);

  const getContextForPrompt = () => {
    if (!state.aiContext.enabled) return '';

    let context = 'Follow these software engineering practices:\n\n';
    
    if (state.aiContext.useDefaultPractices) {
      defaultPractices.forEach(practice => {
        context += `${practice.title}:\n${practice.content}\n\n`;
      });
    }

    return context;
  };

  return {
    practices: defaultPractices,
    aiContext: state.aiContext,
    updateAIContext: knowledgeBaseActions.updateAIContext,
    getContextForPrompt
  };
}

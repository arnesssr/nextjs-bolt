import { atom } from 'nanostores';

export interface Practice {
  id: string;
  category: string;
  title: string;
  content: string;
  tags: string[];
}

export interface UserInstruction {
  id: string;
  title: string;
  content: string;
  created: Date;
  updated: Date;
}

export interface ProjectRequirement {
  id: string;
  title: string;
  description: string;
  framework?: string;
  language?: string;
  architecture?: 'modular' | 'monolithic' | 'microservices' | 'layered';
  specificRequirements: string;
  created: Date;
  updated: Date;
}

export interface KnowledgeBaseState {
  practices: Practice[];
  userInstructions: UserInstruction[];
  aiContext: {
    enabled: boolean;
    useDefaultPractices: boolean;
    useUserInstructions: boolean;
  };
  projectRequirements: ProjectRequirement[];
  activeFramework?: string;
  activeLanguage?: string;
  activeArchitecture?: string;
}

export const knowledgeBaseStore = atom<KnowledgeBaseState>({
  practices: [],
  userInstructions: [],
  aiContext: {
    enabled: true,
    useDefaultPractices: true,
    useUserInstructions: true
  },
  projectRequirements: []
});

// Actions
export const knowledgeBaseActions = {
  addUserInstruction: (instruction: Omit<UserInstruction, 'id' | 'created' | 'updated'>) => {
    const newInstruction = {
      ...instruction,
      id: crypto.randomUUID(),
      created: new Date(),
      updated: new Date()
    };

    knowledgeBaseStore.set({
      ...knowledgeBaseStore.get(),
      userInstructions: [...knowledgeBaseStore.get().userInstructions, newInstruction]
    });
  },

  updateAIContext: (context: Partial<KnowledgeBaseState['aiContext']>) => {
    knowledgeBaseStore.set({
      ...knowledgeBaseStore.get(),
      aiContext: {
        ...knowledgeBaseStore.get().aiContext,
        ...context
      }
    });
  },

  addProjectRequirement: (requirement: Omit<ProjectRequirement, 'id' | 'created' | 'updated'>) => {
    const newRequirement = {
      ...requirement,
      id: crypto.randomUUID(),
      created: new Date(),
      updated: new Date()
    };

    knowledgeBaseStore.set({
      ...knowledgeBaseStore.get(),
      projectRequirements: [...knowledgeBaseStore.get().projectRequirements, newRequirement]
    });
  },

  setActiveFramework: (framework: string) => {
    knowledgeBaseStore.set({
      ...knowledgeBaseStore.get(),
      activeFramework: framework
    });
  }
};

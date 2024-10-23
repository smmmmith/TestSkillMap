export interface User {
  id: string;
  email: string;
  name?: string;
  age?: number;
  gender?: string;
  goals: string[];
  progress: Record<string, SkillProgress>;
}

export interface Skill {
  id: string;
  title: string;
  description: string;
  level: 1 | 2;
  prerequisites: string[];
  content: {
    modules: LearningModule[];
    examples: StoryExample[];
    exercises: PracticeExercise[];
  };
}

export interface SkillProgress {
  status: 'incomplete' | 'completed' | 'locked' | 'available';
  completedModules: string[];
  lastAccessed: string;
}

export interface LearningModule {
  id: string;
  title: string;
  content: string;
}

export interface StoryExample {
  id: string;
  title: string;
  story: string;
}

export interface PracticeExercise {
  id: string;
  title: string;
  instructions: string;
}
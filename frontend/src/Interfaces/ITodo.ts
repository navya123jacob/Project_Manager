export interface ITodo {
    _id: string;
    description: string;
    status: 'pending' | 'completed';
    projectId: string;
    createdAt: string;
    updatedAt: string;
  }
  
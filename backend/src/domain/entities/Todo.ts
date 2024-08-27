import mongoose, { Schema, Document } from 'mongoose';

export interface ITodo extends Document {
  description: string;
  status: 'pending' | 'completed';
  createdAt?: Date;
  updatedAt?: Date;
  projectId: string;
}
import mongoose, { Schema, Document } from 'mongoose';
import { ITodo } from './Todo';

export interface IProject extends Document {
  title: string;
  createdAt?: Date;
  todos: ITodo[]; 
}
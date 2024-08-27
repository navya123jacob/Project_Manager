import mongoose, { Schema, Document } from 'mongoose';
import { ITodo } from '../../../domain/entities/Todo';

export interface ITodoDocument extends ITodo, Document {}

const TodoSchema: Schema = new Schema({
  description: { type: String, required: true },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
});

export default mongoose.model<ITodoDocument>('Todo', TodoSchema);

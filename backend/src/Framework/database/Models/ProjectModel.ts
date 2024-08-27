import mongoose, { Schema, Document } from 'mongoose';
import { IProject } from '../../../domain/entities/Project';

export interface IProjectDocument extends IProject, Document {}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
});

export default mongoose.model<IProjectDocument>('Project', ProjectSchema);

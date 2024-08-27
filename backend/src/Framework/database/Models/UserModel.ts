import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../../../domain/entities/User';
const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  git: { type: String },
  linkedin: { type: String },
  mobile: { type: String },
  gender: { type: String, enum: ['male', 'female', 'other'] },
});


export default mongoose.model<IUser>('User', UserSchema);

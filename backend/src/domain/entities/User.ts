import mongoose, { Schema, Document } from 'mongoose';
export interface IUser extends Document {
    email: string;
    password: string;
    createdAt: Date;
    fname: string;
    lname: string;
    git: string; 
    linkedin: string; 
    mobile: string;
    gender: 'male' | 'female' | 'other'; 
  }
  
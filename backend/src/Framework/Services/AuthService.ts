import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../database/Models/UserModel';
import { IUser } from '../../domain/entities/User';

export class AuthService {
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

  async registerUser(email: string, password: string,fname: string,lname: string,git: string,linkedin: string,mobile: string,gender: 'male' | 'female' | 'other'  ): Promise<IUser | { message: string }> {
    try {
      const existingUser = await UserModel.findOne({ email });

      if (existingUser) {
        return { message: 'User already exists' };
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new UserModel({
        email,
        fname,
        lname,
        password: hashedPassword,
        createdAt: new Date(),
        git,
        linkedin,
        mobile,
        gender,
      });

      await newUser.save();

      return newUser.toObject();
    } catch (e) {
      return { message: (e as Error).message };
    }
  }

  async loginUser(email: string, password: string): Promise<{ token: string; user: IUser } | { message: string }> {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return { message: 'Invalid email or password' };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return { message: 'Invalid email or password' };
    }

    const token = jwt.sign({ id: user._id, email: user.email }, this.JWT_SECRET, {
      expiresIn: '1h',
    });

    return { token, user };
  }
}

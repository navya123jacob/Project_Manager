import { Request, Response } from 'express';
import { AuthService } from '../Framework/Services/AuthService';
import { IUser } from '../domain/entities/User';
import UserModel from '../Framework/database/Models/UserModel';


export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, fname, lname, git, linkedin, mobile, gender } = req.body;
      const user = await this.authService.registerUser(email, password, fname, lname, '', '', mobile, gender);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
  

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      console.log(req.body)
      const response = await this.authService.loginUser(email, password);

      if ('message' in response) {
        res.status(400).json({ error: response.message });
      } else {
       
        res.cookie('token', response.token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        
        res.status(200).json({ user: response.user });
      }
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
  async updateUser(userId: string, data: Partial<IUser>): Promise<void> {
    console.log(userId)
    // const user = await UserModel.findById(userId);
    // if (!user) {
    //   throw new Error('User not found');
    // }

    // if (data.email && data.email !== user.email) {
    //   throw new Error('Email cannot be changed');
    // }
   
    // Object.assign(user, data);
    // await user.save();
    // return user.toObject();
  }
}

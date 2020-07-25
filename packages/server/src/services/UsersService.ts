import { Request, Response } from 'express';

import User from '../models/User';
import { RegisterUserDto } from '../dto/RegisterUserDto';

export class UsersService {
  async registerUser(data: RegisterUserDto) {
    try {
      const user = new User(data);
      await user.save();
      return user;
    } catch (error) {
      throw new Error('Register failed!');
    }
  }
}

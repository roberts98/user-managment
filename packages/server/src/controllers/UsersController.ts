import { Request, Response } from 'express';

import { UsersService } from '../services/UsersService';
import { Dependencies } from '../dependencies';
import { RegisterUserDto } from '../dto/RegisterUserDto';

class UsersController {
  usersService: UsersService;

  constructor(deps: Dependencies) {
    this.usersService = deps.usersService;
  }

  registerUser = async (req: Request, res: Response) => {
    const data = req.body as RegisterUserDto;

    try {
      await this.usersService.registerUser(data);
      res.json({
        success: true,
        message: 'Successfull regsistration!',
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
}

export default UsersController;

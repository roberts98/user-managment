import { User, IUser } from '../models/User';
import { RegisterUserDto } from '../dto/RegisterUserDto';
import { LoginUserDto } from '../dto/LoginUserDto';

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

  async loginUser(data: LoginUserDto): Promise<{ user: IUser; token: string }> {
    try {
      const { username, password } = data;
      const user = await User.findByCredentials(username, password);
      const token = user.generateAuthToken();
      return { user, token };
    } catch (error) {
      throw new Error('Unable to login');
    }
  }
}

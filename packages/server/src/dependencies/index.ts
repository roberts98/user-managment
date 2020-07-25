import { UsersService } from '../services/UsersService';

export interface Dependencies {
  usersService: UsersService;
}

function createDependencies() {
  return {
    usersService: new UsersService(),
  };
}

export const dependencies = createDependencies();

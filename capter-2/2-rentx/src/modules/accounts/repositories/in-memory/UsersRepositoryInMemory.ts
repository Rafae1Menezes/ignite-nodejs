import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO';
import { User } from '../../infra/typeorm/entities/Users';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  repository: User[] = [];

  async create(data: ICreateUserDTO): Promise<void> {
    const user = new User();
    Object.assign(user, data);
    this.repository.push(user);
  }
  async findByEmail(email: string): Promise<User> {
    return this.repository.find((user) => user.email === email);
  }
  async findById(id: string): Promise<User> {
    return this.repository.find((user) => user.id === id);
  }
}

export { UsersRepositoryInMemory };

import { getRepository, Repository } from 'typeorm';

import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { ICreateUserTokenDTO } from '@modules/dtos/ICreateUserTokenDTO';

import { UserTokens } from '../entities/UserTokens';

class UsersTokensRepository implements IUsersTokensRepository {
  private repositoy: Repository<UserTokens>;

  constructor() {
    this.repositoy = getRepository(UserTokens);
  }

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repositoy.create({
      expires_date,
      refresh_token,
      user_id,
    });

    await this.repositoy.save(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    const usersTokens = await this.repositoy.findOne({
      user_id,
      refresh_token,
    });
    return usersTokens;
  }

  async deleteById(id: string): Promise<void> {
    await this.repositoy.delete(id);
  }

  async findyByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userToken = await this.repositoy.findOne({ refresh_token });
    return userToken;
  }
}

export { UsersTokensRepository };

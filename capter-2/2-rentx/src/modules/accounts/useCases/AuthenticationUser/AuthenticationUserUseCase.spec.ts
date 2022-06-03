import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { ICreateUserDTO } from '@modules/dtos/ICreateUserDTO';

import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../CreateUser/CreateUserUseCase';
import { AuthenticationUserUseCase } from './AuthenticationUserUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let authenticationUserUseCase: AuthenticationUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticationUserUseCase = new AuthenticationUserUseCase(
      usersRepositoryInMemory
    );
  });

  it('should be abe to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '6877636879297',
      email: 'email@email.com',
      name: 'Rafael',
      password: '123456',
    };

    await createUserUseCase.execute(user);

    const result = await authenticationUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should not to be able to authneticate an noexistent user', async () => {
    await expect(
      authenticationUserUseCase.execute({
        email: 'false@email.com',
        password: 'false123',
      })
    ).rejects.toEqual(new AppError('Email or password incorrect!'));
  });

  it('should not be able to authenticate with incorrect password', async () => {
    const user: ICreateUserDTO = {
      driver_license: '6877636879297',
      email: 'email@email.com',
      name: 'Rafael',
      password: '123456',
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticationUserUseCase.execute({
        email: user.email,
        password: 'falsepassword',
      })
    ).rejects.toEqual(new AppError('Email or password incorrect!'));
  });
});

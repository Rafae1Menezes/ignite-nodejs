import { DayJsDateProvider } from '../../../../shared/container/providers/DateProvider/implementations/DayJsDateProvider';
import { MailProviderInMemory } from '../../../../shared/container/providers/MailProvider/inMemory/MailProviderInMemory';
import { AppError } from '../../../../shared/errors/AppError';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '../../repositories/in-memory/UsersTokensRepositoryInMemory';
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayJsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe('Send Forgot Mail', () => {
  beforeAll(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayJsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it('should be able to sen a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sandMail');

    await usersRepositoryInMemory.create({
      driver_license: '664168',
      email: 'teste@gmail.com',
      name: 'Fulano teste',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('teste@gmail.com');

    expect(sendMail).toBeCalled();
  });

  it('Should not be able to send an email if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('inexistente@gmail.com')
    ).rejects.toEqual(new AppError('User does not exists!'));
  });

  it('should be able to create an users token', async () => {
    const generateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      'create'
    );

    await usersRepositoryInMemory.create({
      driver_license: '48757',
      email: 'teste2@gmail.com',
      name: 'Fulano2 teste2',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('teste2@gmail.com');

    expect(generateTokenMail).toBeCalled();
  });
});

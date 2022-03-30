import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';

import { DayJsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayJsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let rentalRepository: RentalsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let carsRepository: CarsRepositoryInMemory;
const dateProvider = new DayJsDateProvider();

describe('Create Rental', () => {
  const today = dateProvider.dateNow();
  const dayAdd24hours = dateProvider.addDays(today, 1);

  beforeEach(() => {
    rentalRepository = new RentalsRepositoryInMemory();
    carsRepository = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalRepository,
      dateProvider,
      carsRepository,
    );
  });

  it('Should be able to create a new renal', async () => {
    const data = {
      car_id: 'id car fake',
      user_id: 'user id fake',
      expected_return_date: dayAdd24hours,
    };

    const rental = await createRentalUseCase.execute(data);

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('Should not be able to create a new renal if there is another open to the same user', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: 'sameCar',
        user_id: 'user1',
        expected_return_date: dayAdd24hours,
      });

      await createRentalUseCase.execute({
        car_id: 'sameCar',
        user_id: 'user2',
        expected_return_date: dayAdd24hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new renal if there is another open to the same car', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: 'car1',
        user_id: 'sameUser',
        expected_return_date: dayAdd24hours,
      });

      await createRentalUseCase.execute({
        car_id: 'car2',
        user_id: 'sameUser',
        expected_return_date: dayAdd24hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental with invalid return time', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: 'car1',
        user_id: 'sameUser',
        expected_return_date: today,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});

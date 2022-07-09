import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayJsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayJsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let rentalRepository: RentalsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let carsRepository: CarsRepositoryInMemory;
let car: Car;
const dateProvider = new DayJsDateProvider();

describe('Create Rental', () => {
  const today = dateProvider.dateNow();
  const dayAdd24hours = dateProvider.addDays(today, 1);

  beforeEach(async () => {
    rentalRepository = new RentalsRepositoryInMemory();
    carsRepository = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalRepository,
      dateProvider,
      carsRepository
    );

    car = await carsRepository.create({
      name: 'carro test',
      brand: 'marca teste',
      description: 'descrica teste',
      category_id: 'aabcd1234',
      license_plate: 'aaa111',
      daily_rate: 100,
      fine_amount: 50,
    });
  });

  it('Should be able to create a new renal', async () => {
    const data = {
      car_id: car.id,
      user_id: 'user id fake',
      expected_return_date: dayAdd24hours,
    };

    const rental = await createRentalUseCase.execute(data);

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('Should not be able to create a new renal if there is another open to the same car', async () => {
    await createRentalUseCase.execute({
      car_id: car.id,
      user_id: 'user1',
      expected_return_date: dayAdd24hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: car.id,
        user_id: 'user2',
        expected_return_date: dayAdd24hours,
      })
    ).rejects.toEqual(new AppError('Car is unavailable'));
  });

  it('Should not be able to create a new renal if there is another open to the same user', async () => {
    await createRentalUseCase.execute({
      car_id: car.id,
      user_id: 'sameUser',
      expected_return_date: dayAdd24hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: 'outrocarro',
        user_id: 'sameUser',
        expected_return_date: dayAdd24hours,
      })
    ).rejects.toEqual(new AppError("There's a rental in progress for user!"));
  });

  it('should not be able to create a new rental with invalid return time', async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: car.id,
        user_id: 'sameUser',
        expected_return_date: today,
      })
    ).rejects.toEqual(new AppError('invalid return time!'));
  });
});

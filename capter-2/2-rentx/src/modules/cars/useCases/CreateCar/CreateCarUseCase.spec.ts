import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be abe to create a new car', async () => {
    const newCar = await createCarUseCase.execute({
      name: 'Name Car',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'categoryuuid',
    });

    expect(newCar).toHaveProperty('id');
  });

  it('should not be able to create a car with exist license plate', () => {
    expect(async () => {
      const newCar = {
        name: 'Name Car',
        description: 'Description car',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'categoryuuid',
      };

      await createCarUseCase.execute(newCar);
      await createCarUseCase.execute(newCar);
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a car with available true by default', async () => {
    const newCar = await createCarUseCase.execute({
      name: 'Name Car',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'categoryuuid',
    });

    expect(newCar.available).toBe(true);
  });
});

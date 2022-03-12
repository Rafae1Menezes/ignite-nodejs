import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Car Band',
      category_id: 'Category ID',
      daily_rate: 60,
      description: 'Car description',
      fine_amount: 100,
      license_plate: 'abc-123',
      name: 'Car name test',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Car Band',
      category_id: 'Category ID',
      daily_rate: 60,
      description: 'Car description',
      fine_amount: 100,
      license_plate: 'abc-123',
      name: 'Car name test fake',
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: 'Car name test fake',
    });

    // expect(cars).toEqual([car]);
    expect(cars).toEqual(expect.arrayContaining([car]));
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Car Band fake',
      category_id: 'Category ID',
      daily_rate: 60,
      description: 'Car description',
      fine_amount: 100,
      license_plate: 'abc-123',
      name: 'Car name test',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Car Band fake',
    });

    // expect(cars).toEqual([car]);
    expect(cars).toEqual(expect.arrayContaining([car]));
  });

  it('should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Car Band',
      category_id: 'Category ID fake',
      daily_rate: 60,
      description: 'Car description',
      fine_amount: 100,
      license_plate: 'abc-123',
      name: 'Car name test',
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: 'Category ID fake',
    });

    // expect(cars).toEqual([car]);
    expect(cars).toEqual(expect.arrayContaining([car]));
  });
});

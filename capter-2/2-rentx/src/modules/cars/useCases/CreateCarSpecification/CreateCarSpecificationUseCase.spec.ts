import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';

import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositryInMemory: SpecificationsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe('Crete Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositryInMemory
    );
  });

  it('should be able to add a new specification to a car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'name fake',
      description: 'Description fake',
      daily_rate: 100,
      license_plate: 'ABC-fake',
      fine_amount: 60,
      brand: 'Brand fake',
      category_id: '8d7791a8-60b7-480b-8c4b-c3dab441b500',
    });

    const specification = await specificationsRepositryInMemory.create({
      name: 'specificação fake',
      description: 'descrição fake',
    });

    const specificationsCar = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: [specification.id],
    });

    expect(specificationsCar).toHaveProperty('specifications');
    expect(specificationsCar.specifications.length).toBe(1);
  });

  it('should not be able to add a new specification to a non-existent car', async () => {
    await expect(
      createCarSpecificationUseCase.execute({
        car_id: 'car id fake',
        specifications_id: ['specification id fake'],
      })
    ).rejects.toEqual(new AppError('Car does not exists!'));
  });
});

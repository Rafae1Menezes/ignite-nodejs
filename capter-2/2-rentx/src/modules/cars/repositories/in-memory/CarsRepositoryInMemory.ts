import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICreateCarDTO } from '@modules/dtos/ICreateCarDTO';

import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  repository: Car[] = [];

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = new Car();
    Object.assign(car, data);
    this.repository.push(car);
    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.repository.find((car) => car.license_plate === license_plate);
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    return this.repository.filter((car) => {
      if (car.available) {
        if (!brand && !category_id && !name) {
          return true;
        }
        if (
          car.brand === brand ||
          car.category_id === category_id ||
          car.name === name
        ) {
          return true;
        }
      }
      return false;
    });
  }

  async findById(car_id: string): Promise<Car> {
    return this.repository.find((car) => car.id === car_id);
  }
}

export { CarsRepositoryInMemory };

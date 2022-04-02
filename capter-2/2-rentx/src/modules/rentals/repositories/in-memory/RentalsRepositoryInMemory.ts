import { ICreateRentalDTO } from '@modules/dtos/ICreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

import { IRentalsRepository } from '../IRentalsRepository';

class RentalsRepositoryInMemory implements IRentalsRepository {
  repository: Rental[] = [];

  async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();
    Object.assign(rental, {
      ...data,
      start_date: new Date(),
    });
    this.repository.push(rental);
    return rental;
  }

  async findById(id: string): Promise<Rental> {
    return this.repository.find((rental) => rental.id === id);
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.repository.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.repository.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );
  }

  async list(): Promise<Rental[]> {
    return this.repository;
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    return this.repository.filter((rental) => rental.user_id === user_id);
  }
}

export { RentalsRepositoryInMemory };

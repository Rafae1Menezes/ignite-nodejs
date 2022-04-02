import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

dayjs.extend(utc);

interface IRequest {
  car_id: string;
  user_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalRepository: IRentalsRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute(data: IRequest): Promise<Rental> {
    const minimumHours = 24;
    const minimumMinutes = minimumHours * 60 - 1;

    const carUnavailable = await this.rentalRepository.findOpenRentalByCar(
      data.car_id
    );

    if (carUnavailable) {
      throw new AppError('Car is unavailable');
    }

    const rentalOpenToUser = await this.rentalRepository.findOpenRentalByUser(
      data.user_id
    );

    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for user!");
    }

    const minutes = this.dateProvider.compareInMinutes(
      this.dateProvider.dateNow(),
      data.expected_return_date
    );

    if (minutes < minimumMinutes) {
      throw new AppError('invalid return time!');
    }

    const rental = this.rentalRepository.create(data);
    await this.carsRepository.updateAvailable(data.car_id, false);
    return rental;
  }
}

export { CreateRentalUseCase };

import { inject, injectable } from 'tsyringe';

import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject(SpecificationsRepository)
    private specificationRepository: ISpecificationsRepository
  ) {}

  async execute({ name, description }): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError('Specification already exists');
    }

    await this.specificationRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };

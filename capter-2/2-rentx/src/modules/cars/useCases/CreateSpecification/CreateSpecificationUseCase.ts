import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { SpecificationRepository } from '../../repositories/implementations/SpecificationRepository';
import { ISpecificationRepository } from '../../repositories/ISpecificationRepository';

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject(SpecificationRepository)
    private specificationRepository: ISpecificationRepository
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

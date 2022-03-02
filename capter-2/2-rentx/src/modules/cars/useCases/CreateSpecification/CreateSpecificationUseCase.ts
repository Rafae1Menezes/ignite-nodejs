import { Specification } from '../../model/Specification';
import { ISpecificationRepository } from '../../repositories/implementations/ISpecificationRepository';

class CreateSpecificationUseCase {
  private specificationRepository: ISpecificationRepository;

  constructor(specificationRepository: ISpecificationRepository) {
    this.specificationRepository = specificationRepository;
  }

  execute({ name, description }): void {
    const specificationAlreadyExists =
      this.specificationRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error('Specification already exists');
    }

    this.specificationRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };

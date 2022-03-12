import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { ICreateSpecificationDTO } from '@modules/dtos/ICreateSpecificationDTO';

import { ISpecificationsRepository } from '../ISpecificationsRepository';

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  repository: Specification[] = [];

  async create(data: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();
    Object.assign(specification, data);
    this.repository.push(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    return this.repository.find((specification) => specification.name === name);
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.repository.filter((specification) =>
      ids.includes(specification.id)
    );
  }
}

export { SpecificationsRepositoryInMemory };

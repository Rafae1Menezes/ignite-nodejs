import { IUploadCarImageDTO } from '@modules/dtos/IUploadCarImageDTO';

import { CarImage } from '../infra/typeorm/entities/CarImage';

interface ICarsImagesRepository {
  create(data: IUploadCarImageDTO): Promise<CarImage>;
}

export { ICarsImagesRepository };

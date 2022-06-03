import { CreateCarController } from '@modules/cars/useCases/CreateCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/CreateCarSpecification/CreateCarSpecificationController';
import { ListAvailableCarsController } from '@modules/cars/useCases/ListAvailableCars/ListAvailableCarsController';
import { UploadCarImagesController } from '@modules/cars/useCases/UploadCarImage/UploadCarImagesController';
import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../../../../config/upload';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const carsRoutes = Router();
const createCarController = new CreateCarController();
const listAvailableCarsUseCase = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImagesController();

const upload = multer(uploadConfig.upload('./tmp/cars'));

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);

carsRoutes.post(
  '/images/:id',
  ensureAuthenticated,
  ensureAdmin,
  upload.array('images'),
  uploadCarImageController.handle
);

carsRoutes.get('/available', listAvailableCarsUseCase.handle);

export { carsRoutes };

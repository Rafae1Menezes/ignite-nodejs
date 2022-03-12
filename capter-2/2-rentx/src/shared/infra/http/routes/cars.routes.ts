import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/CreateCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/CreateCarSpecification/CreateCarSpecificationController';
import { ListAvailableCarsController } from '@modules/cars/useCases/ListAvailableCars/ListAvailableCarsController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const carsRoutes = Router();
const createCarController = new CreateCarController();
const listAvailableCarsUseCase = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();

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

carsRoutes.get('/available', listAvailableCarsUseCase.handle);

export { carsRoutes };

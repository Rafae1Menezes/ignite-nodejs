import { Router } from 'express';

import { ListAvailableCarsController } from '@modules/cars/useCases/ListAvailableCars/ListAvailableCarsController';
import { CreateRentalController } from '@modules/rentals/useCases/CreateRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/DevolutionRental/DevolutionRentalController';
import { ListRentalsByUserController } from '@modules/rentals/useCases/ListRentalsByUser/ListRentalsByUserController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalsRouter = Router();
const createUserController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRouter.post('/', ensureAuthenticated, createUserController.handle);
rentalsRouter.post(
  '/devolution/:id',
  ensureAuthenticated,
  devolutionRentalController.handle
);

rentalsRouter.get(
  '/user',
  ensureAuthenticated,
  listRentalsByUserController.handle
);

export { rentalsRouter };

import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/CreateRental/CreateRentalController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalsRouter = Router();
const createUserController = new CreateRentalController();

rentalsRouter.post('/', ensureAuthenticated, createUserController.handle);

export { rentalsRouter };

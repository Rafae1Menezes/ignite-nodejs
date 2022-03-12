import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '../../../../modules/cars/useCases/CreateCategory/CreateCategoryController';
import { ImportCategoryController } from '../../../../modules/cars/useCases/ImportCategory/ImportCategoryController';
import { ListCategoriesController } from '../../../../modules/cars/useCases/ListCategories/ListCategoriesController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const upload = multer({
  dest: './tmp',
});

const categoriesRoutes = Router();
const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle
);

categoriesRoutes.post(
  '/import',
  ensureAuthenticated,
  ensureAdmin,
  upload.single('file'),
  importCategoryController.handle
);

categoriesRoutes.get('/', listCategoriesController.handle);

export { categoriesRoutes };

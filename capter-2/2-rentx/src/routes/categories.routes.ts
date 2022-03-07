import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '../modules/cars/useCases/CreateCategory/CreateCategoryController';
import { ImportCategoryController } from '../modules/cars/useCases/ImportCategory/ImportCategoryController';
import { ListCategoriesController } from '../modules/cars/useCases/ListCategories/ListCategoriesController';

const upload = multer({
  dest: './tmp',
});

const categoriesRoutes = Router();
const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle
);

categoriesRoutes.get('/', listCategoriesController.handle);

export { categoriesRoutes };

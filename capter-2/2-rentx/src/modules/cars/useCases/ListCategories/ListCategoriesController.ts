import { Request, Response } from 'express';

import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
  private listCategoriesUsecase: ListCategoriesUseCase;

  constructor(listCategoriesUsecase: ListCategoriesUseCase) {
    this.listCategoriesUsecase = listCategoriesUsecase;
  }

  handle(request: Request, response: Response): Response {
    const all = this.listCategoriesUsecase.execute();
    return response.json(all);
  }
}

export { ListCategoriesController };

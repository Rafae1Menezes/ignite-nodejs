import { Request, Response } from 'express';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController {
  private createCategoryUseCase: CreateCategoryUseCase;

  constructor(CreateCategoryUseCase: CreateCategoryUseCase) {
    this.createCategoryUseCase = CreateCategoryUseCase;
  }

  handle(request: Request, response: Response): Response {
    const { name, description } = request.body;

    this.createCategoryUseCase.execute({ name, description });

    return response.status(201).send();
  }
}

export { CreateCategoryController };

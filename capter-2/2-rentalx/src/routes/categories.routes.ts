import { Router } from 'express';

import { CategoriesRepostory } from '../repositories/CategoriesRepositry';

const categoriesRoutes = Router();
const categoriesRepostory = new CategoriesRepostory();

categoriesRoutes.post('/', (request, response) => {
    const { name, description } = request.body;

    const categoryAlreadyExists = categoriesRepostory.findByName(name);

    if (categoryAlreadyExists) {
        return response.status(400).json({ error: 'Category already exists!' });
    }

    categoriesRepostory.create({ name, description });

    return response.status(201).send();
});

categoriesRoutes.get('/', (request, response) => {
    const all = categoriesRepostory.list();

    return response.json(all);
});

export { categoriesRoutes };

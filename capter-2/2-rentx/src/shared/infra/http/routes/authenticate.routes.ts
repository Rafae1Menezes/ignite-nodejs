import { Router } from 'express';

import { RefreshTokenController } from '@modules/accounts/useCases/RefreshToken/RefreshTokenController';

import { AuthenticationUserController } from '../../../../modules/accounts/useCases/AuthenticationUser/AuthenticationUserController';

const authenticateRoutes = Router();

const authenticationUserController = new AuthenticationUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post('/session', authenticationUserController.handle);
authenticateRoutes.post('/refresh-token', refreshTokenController.handle);

export { authenticateRoutes };

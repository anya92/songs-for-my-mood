import express from 'express';
import * as authControllers from '../controllers/authControllers';
import * as apiControllers from '../controllers/apiControllers';

const catchErrors = apiControllers.catchErrors;

const router = express.Router();

// SPOTIFY AUTHENTICATION

router.get('/auth/spotify', authControllers.login);

router.get('/auth/spotify/callback', authControllers.loginCallback);

router.get('/auth/current_user', authControllers.getUser);

router.get('/auth/logout', authControllers.logout);

// API

router.get(
  '/api/recommended_songs',
  apiControllers.checkAccessToken,
  apiControllers.getRecommendations(),
);

export default router;

import express from 'express';
import * as ApiController from '../controllers/api';

const router = express.Router();

router.get('/theater/code/:code', ApiController.getTheaterInfo);
router.get('/movie/code/:code', ApiController.getMovieInfoByCode);
router.get('/movie/name/:name', ApiController.getMovieInfoByName);
router.get('/theater/near', ApiController.nearestTheaters);
router.get('/movies-near', ApiController.nearestMovies);
router.get('/trending', ApiController.trending);

export default router;

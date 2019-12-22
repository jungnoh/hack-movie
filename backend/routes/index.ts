import express from 'express';
import * as ApiController from '../controllers/api';
import { TheaterModel } from '../models';

const router = express.Router();

router.get('/theater/code/:code', ApiController.getTheaterInfo);
router.get('/movie/code/:code', ApiController.getMovieInfoByCode);
router.get('/movie/name/:name', ApiController.getMovieInfoByName);
router.get('/theater/near', ApiController.nearestTheaters);
router.get('/movies-near', ApiController.nearestMovies);
router.get('/trending', ApiController.trending);
router.get('/all-theaters', async (req, res) => {
    const ll = await TheaterModel.find({});
    const v: any = {};
    for (const it of ll) {
        v[it.naverCode] = it;
    }
    res.status(200).json({
        theaters: v
    });
});
export default router;

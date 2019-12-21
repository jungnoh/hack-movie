import express, {Request, Response} from 'express';
import * as Models from '../models';

/**
 * @description GET /theater/code/:code
 * 해당 코드에 대한 영화관 정보를 반환
 */
export async function getTheaterInfo(req: Request, res: Response) {
  try {
    const theater = await Models.TheaterModel.find({
      naverCode: req.params.code ?? ''
    });
    if (theater === null) {
      res.status(404).json({
        success: false
      });
    } else {
      res.status(200).json({
        success: true,
        theater
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({success: false});
  }
}

/**
 * @description GET /movie/code/:code
 * 해당 코드에 대한 영화 정보를 반환
 */
export async function getMovieInfoByCode(req: Request, res: Response) {
  try {
    const movie = await Models.MovieModel.find({
      naverCode: req.params.code ?? ''
    });
    if (movie === null) {
      res.status(404).json({
        success: false
      });
    } else {
      res.status(200).json({
        success: true,
        movie
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({success: false});
  }
}

/**
 * @description GET /movie/name/:name
 * 해당 제목에 대한 영화 정보를 반환
 */
export async function getMovieInfoByName(req: Request, res: Response) {
  try {
    const movie = await Models.MovieModel.find({
      title: (req.params.name ?? '').trim()
    });
    if (movie === null) {
      res.status(404).json({
        success: false
      });
    } else {
      res.status(200).json({
        success: true,
        movie
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({success: false});
  }
}

async function findNearestTheaters(x: number, y: number, count: number = 5) {
  const theaters = await Models.TheaterModel.find();
  const theatersWithDists = theaters.map(t => {
    return Object.assign(t, {
      dist: (t.coordX-x) * (t.coordX-x) + (t.coordY-y) * (t.coordY-y)
    });
  });
  theatersWithDists.sort((a: any, b: any) => a.dist-b.dist);
  return theatersWithDists.slice(0, count);
}

/**
 * @description GET /theater/near?x=127.03237293819225&y=37.588750090892205
 */
export async function nearestTheaters(req: Request, res: Response) {
  try {
    res.status(200).json({
      theaters: await findNearestTheaters(parseFloat(req.query.x ?? 0), parseFloat(req.query.y ?? 0), 10),
      success: true
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({success: false});
  }
}

/**
 * @description GET /movies-near?x=127.0532794&y=37.5059059&movie=M000074640
 */
export async function nearestMovies(req: Request, res: Response) {
  try {
    const nearTheaters = await findNearestTheaters(parseFloat(req.query.x ?? 0), parseFloat(req.query.y ?? 0));
    const theaterKeys = nearTheaters.map((x: Models.Theater) => x.naverCode);
    const slots = await Models.MovieSlotModel.find({
      theaterCode: {
        $in: theaterKeys
      },
      movieCode: (req.query.movie ?? '').trim(),
      hour: {
        $gte: new Date().getHours()
      }
    }).sort('hour').sort('minute');
    res.status(200).json({
      success: true,
      slots
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({success: false});
  }
}
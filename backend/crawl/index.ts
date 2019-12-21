import { loadTheaterData, loadMovieData, theaterMovieList } from "./naver";
import * as Models from '../models';

export async function reloadTheaterList() {
  console.log('Loading theater list..');
  const data = await loadTheaterData();
  console.log('Saving theater list..');
  for(const item of data) {
    if (await Models.TheaterModel.findOne({naverCode: item.code}) === null) {
      console.log(`Adding ${item.code}: ${item.name}`)
      const nItem = new Models.TheaterModel({
        naverCode: item.code,
        name: item.name,
        type: item.type,
        coordX: item.coords.x,
        coordY: item.coords.y
      });
      await nItem.save();
    }
  }
}

export async function reloadMovieList() {
  console.log('Loading movie list..');
  const data = await loadMovieData();
  console.log('Saving movie list..');
  for(const item of data) {
    if (await Models.TheaterModel.findOne({naverCode: item.movieCode}) === null) {
      console.log(`Adding ${item.movieCode}: ${item.title}`)
      const nItem = new Models.MovieModel({
        naverCode: item.movieCode,
        title: item.title.trim(),
        posterUrl: item.posterUrl
      });
      await nItem.save();
    }
  }
}


async function addTheaterSlots(day: Date, theaterCode: string) {
  const movies = await theaterMovieList(theaterCode, day);
  for (const movie of movies) {
    for (const slot of movie.times) {
      const newData = new Models.MovieSlotModel({
        day,
        theaterCode,
        movieCode: movie.movieCode,
        venue: slot.venue,
        hour: slot.hour,
        minute: slot.minute,
        runningTime: slot.runningTime
      });
      await newData.save();
    }
  }
}

export async function todayMovieList() {
  const todayDate = new Date();
  todayDate.setHours(0);
  todayDate.setMinutes(0);
  todayDate.setSeconds(0);
  todayDate.setMilliseconds(0);
  const theaters = await Models.TheaterModel.find({});
  for(const theater of theaters) {
    console.log(`Adding slots for ${theater.naverCode}: ${theater.name}`)
    await addTheaterSlots(todayDate, theater.naverCode);
  }
}

export default async function dailyReload() {
  await reloadTheaterList();
  await reloadMovieList();
  await todayMovieList();
}
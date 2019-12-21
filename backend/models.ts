import mongoose from 'mongoose';

export interface Movie extends mongoose.Document {
  naverCode: string;
  title: string;
  posterUrl: string;
}
const movieSchema = new mongoose.Schema({
  naverCode: {
    index: true,
    required: true,
    type: String,
    unique: true
  },
  title: {required: true, type: String},
  posterUrl: {type: String}
});
export const MovieModel = mongoose.model<Movie>('Movie', movieSchema);

export interface Theater extends mongoose.Document {
  naverCode: string;
  name: string;
  coordX: number;
  coordY: number;
  type: string;
}
const theaterSchema = new mongoose.Schema({
  naverCode: {
    index: true,
    required: true,
    type: String,
    unique: true
  },
  name: {required: true, type: String},
  type: {required: true, type: String},
  coordX: {required: true, type: Number},
  coordY: {required: true, type: Number}
});
export const TheaterModel = mongoose.model<Theater>('Theater', theaterSchema);

export interface MovieSlot extends mongoose.Document {
  day: Date;
  theaterCode: string;
  movieCode: string;
  venue: string;
  hour: number;
  minute: number;
  runningTime: number;
}
const movieSlotSchema = new mongoose.Schema({
  day: {type: Date},
  theaterCode: {index: true, required: true, type: String},
  movieCode: {index: true, required: true, type: String},
  venue: {required: true, type: String},
  hour: {required: true, type: Number},
  minute: {required: true, type: Number},
  runningTime: {required: true, type: Number}
});
export const MovieSlotModel = mongoose.model<MovieSlot>('MovieSlot', movieSlotSchema);

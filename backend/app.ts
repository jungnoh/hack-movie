import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import cron from 'node-cron';

import indexRouter from './routes/index';
import dailyReload from './crawl';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if ((process.env.BACK_MODE ?? 'production') == 'development') {
  console.log('Running in development mode; not serving view');
} else {
  app.use(express.static('../dist'));
}

app.use('/api', indexRouter);

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
cron.schedule('0 0 0 * * *', () => {
  dailyReload().then(() => {
    console.log('Daily reload complete!');
  });
});

app.listen(3000, () => {
  console.log('Backend listening at port 3000');
});
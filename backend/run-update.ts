import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import dailyReload from './crawl';

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
dailyReload().then(() => {
  console.log('Daily reload complete!');
});
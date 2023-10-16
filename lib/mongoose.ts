import mongoose from 'mongoose';

let isConnected = false; //Tracking connection status of mongoose

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGOOSEDB_URI)
    return console.log('MONGOOSEDB_URI not defined');

  if (isConnected) return console.log('using existing DB connection');

  try {
    mongoose.connect(process.env.MONGOOSEDB_URI);
    isConnected = true;
    console.log('MongooseDB Connected');
  } catch (error) {
    console.log(error);
  }
};

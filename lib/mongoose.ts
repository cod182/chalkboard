'use server';
import mongoose from 'mongoose';

let isConnected = false; //Tracking connection status of mongoose

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URI) return console.log('MONGODB_URI not defined');

  if (isConnected) return console.log('using existing DB connection');

  try {
    mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log('MongooseDB Connected');
  } catch (error) {
    console.log(error);
  }
};

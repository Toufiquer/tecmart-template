import mongoose from 'mongoose';

const MONGODB_URI =
  process.env.MONGODB_URI ||
  `mongodb+srv://${process.env.dbusername}:${process.env.dbpassword}@templatenextpwa.nyfzuol.mongodb.net/?retryWrites=true&w=majority&appName=templateNextPWA`;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const cached = global.mongoose || (global.mongoose = { conn: null, promise: null });

export default async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false }).then(mongoose => {
      cached.conn = mongoose.connection;
      return cached.conn;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

import { MongoClient } from 'mongodb';

const url = process.env.MONGO_URL || '';
let connectDB: Promise<MongoClient>;

declare global {
  var _mongo: Promise<MongoClient>
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(url).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url).connect();
}

export { connectDB };

import { setDefaultResultOrder } from "dns";
setDefaultResultOrder('ipv4first')

import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI!;

const options = {
  maxPoolSize: 10,
  minPoolSize: 2,
  maxIdleTimeMs: 30000,
  serverSelectionTimeoutMS: 5000,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

// eslint-disable-next-line prefer-const
clientPromise = global._mongoClientPromise;

export default clientPromise;

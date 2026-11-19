import { MongoClient, Db, Collection } from 'mongodb';

const uri =
  process.env.MONGODB_URI ||
  'mongodb+srv://kingsaksham90_db_user:Saksham123@lpure.2leoslo.mongodb.net/rkw?appName=Lpure';
const dbName = process.env.MONGODB_DB || 'rkw';

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 10000,
    });
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 8000,
    connectTimeoutMS: 10000,
  });
  clientPromise = client.connect();
}

export default clientPromise;

export async function getDatabase(): Promise<Db> {
  const client = await clientPromise;
  return client.db(dbName);
}

export async function getOrdersCollection(): Promise<Collection> {
  const db = await getDatabase();
  return db.collection('orders');
}

export async function getProductsCollection(): Promise<Collection> {
  const db = await getDatabase();
  return db.collection('products');
}

export async function getSettingsCollection(): Promise<Collection> {
  const db = await getDatabase();
  return db.collection('settings');
}

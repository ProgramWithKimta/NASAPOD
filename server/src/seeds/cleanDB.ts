import models from '../models/index.js';
import db from '../config/connection.js';

export default async (modelName: "User", collectionName: string) => {
  try {
    const model = models[modelName];
  
    if (!model?.db?.db) {
      throw new Error(`Model "${modelName}" or its database connection is undefined`);
    }

    const modelExists = await model.db.db
      .listCollections({ name: collectionName })
      .toArray();

    if (modelExists.length) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    throw err;
  }
}

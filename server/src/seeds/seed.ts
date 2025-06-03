import db from "../config/connection.js";
import models from "../models/index.js";
import cleanDB from "./cleanDB.js";

const { User } = models;

import userData from './userData.json' with { type: "json" };

db.once('open', async () => {
  await cleanDB('User', 'users');

  await User.insertMany(userData);

  console.log('Users seeded!');
  process.exit(0);
});

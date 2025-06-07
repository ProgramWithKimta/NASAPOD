import mongoose from 'mongoose';
import 'dotenv/config' 

try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/NASAPOD');
} catch(err) {
    console.log(err);
    throw new Error("Database connection failed")
}

const db = mongoose.connection;

export default db;

import mongoose from 'mongoose';
import 'dotenv/config'

console.log(process.env.MONGODB_URI)
try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/NASAPOD');
} catch(err) {
    console.log(err);
    process.exit(1);
}

const db = mongoose.connection;

export default db;

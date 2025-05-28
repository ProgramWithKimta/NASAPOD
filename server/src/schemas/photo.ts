// schemas/Photo.ts
import mongoose from 'mongoose';
import {IPhoto} from './typephoto';

const PhotoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  date: { type: String }, // ISO format
  explanation: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // If users exist
}, {
  timestamps: true,
});

export default PhotoSchema;

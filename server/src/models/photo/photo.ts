import mongoose, { Model, Document } from 'mongoose';
import PhotoSchema from './photoSchema.js';
import { IPhoto } from './photoType.js';

export interface IPhotoDocument extends IPhoto, Document {}

const Photo: Model<IPhotoDocument> = mongoose.model<IPhotoDocument>('Photo', PhotoSchema);

export default Photo;

import mongoose, { Model, Document } from 'mongoose';
import PhotoSchema from '../schemas/photo.schema';
import { IPhoto } from '../schemas/typePhoto';

export interface IPhotoDocument extends IPhoto, Document {}

const Photo: Model<IPhotoDocument> = mongoose.model<IPhotoDocument>('Photo', PhotoSchema);

export default Photo;

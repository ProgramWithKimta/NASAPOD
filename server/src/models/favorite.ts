import mongoose from 'mongoose';

export interface IFavorite extends Document {
  title: string;
  url: string;
  date: string,
  explanation: string,
}

export const FavoriteSchema = new mongoose.Schema<IFavorite>({
    title: { type: String, required: true },
    url: { type: String, required: true, unique: true },
    date: { type: String }, // ISO format
    explanation: { type: String },
    // username: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // If users exist
  }, {
    timestamps: true,
  }
);

const FavoriteModel = mongoose.model('Favorite', FavoriteSchema);

export default FavoriteModel;

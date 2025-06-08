import mongoose from 'mongoose';

const FavoriteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  date: { type: String }, // ISO format
  explanation: { type: String },
  username: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // If users exist
}, {
  timestamps: true,
});
const FavoriteModel = mongoose.model('Favorite', FavoriteSchema);

export default FavoriteModel;

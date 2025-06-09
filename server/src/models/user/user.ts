import { Schema, model, Types, type Document } from 'mongoose';
import bcrypt from 'bcrypt';
// import { FavoriteSchema } from '../favorite.js';

export interface IUser extends Document {
  username: string;
  password: string;
  favorites: Types.ObjectId[];
  isCorrectPassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters"]
  },
  favorites: [{
    type: Schema.Types.ObjectId,
    ref: 'Favorite'
  }]
});

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

export default User;
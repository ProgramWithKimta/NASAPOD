import axios from 'axios';
import { Types } from 'mongoose';

import { User } from '../models/index.js';
import { generateToken } from '../utils/tokenServices.js'

const NASA_API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';
const NASA_APOD_URL = 'https://api.nasa.gov/planetary/apod';

export interface FavoriteInput {
  title: string;
  url: string;
  date: string;
  explanation: string;
  username: string;
}

async function fetchAPOD(params: Record<string, string | number>) {
  const response = await axios.get(NASA_APOD_URL, {
    params: { api_key: NASA_API_KEY, ...params },
  });
  return response.data;
}

import FavoriteModel from '../models/favorite.js';

const resolvers = {
  Query: {
    //get all the liked photos
    getFavorites: async () => {
      return await FavoriteModel.find({});
    },
    getUserFavorites: async (_: any, { username }: { username: string }) => {
      const user = await User.findOne({ username }).populate('favorites')

      if(!user) {
        throw new Error("Error saving favorite")
      }

      return user.favorites;
    },
    apodToday: async () => {
      return await fetchAPOD({});
    },
    apodLast7: async () => {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 6);
      const start_date = start.toISOString().slice(0, 10);
      const end_date = end.toISOString().slice(0, 10);
      return await fetchAPOD({ start_date, end_date });
    },
    apodRandom: async () => {
      const data = await fetchAPOD({ count: 1 });
      return Array.isArray(data) ? data[0] : data;
    },
    apodByDate: async (_parent: any, { date }: { date: string }) => {
      return await fetchAPOD({ date });
    },   
  },

  Mutation: {
    //save a photo when the user hits Like button 
    saveFavorite: async (_: any, { input }: { input: FavoriteInput }) => {
      const user = await User.findOne({ username: input.username });

      if(!user) {
        throw new Error("Error saving favorite")
      }

      // Don't allow duplicate favoite images to be stored
      let favorite = await FavoriteModel.findOne({ url: input.url })
      if(!favorite) {
        favorite = await FavoriteModel.create({
          title: input.title,
          url: input.url,
          date: input.date,
          explanation: input.explanation
        });
        await favorite.save();
      }

      // Don't allow favoring same image twice
      if(!user.favorites.includes(favorite._id)) {
        user.favorites.push(favorite._id)
        await user.save();
      }

      return favorite;
    },

    deleteFavoriteByUser: async(_: any, { username, favorite_id }: { username: string, favorite_id: string }) => {
      await User.updateOne(
        { username },
        { $pull: { favorites: new Types.ObjectId(favorite_id) } }
      );
    },

    //remove a photo from the favorite gallery 
    deleteFavorite: async (_: any, { id }: { id: string }) => {
      const deleted = await FavoriteModel.findByIdAndDelete(id);
      if (!deleted) {
        throw new Error("Photo not found");
      }
      return `Photo with id ${id} deleted successfully.`;
    },

    login: async (_: any, { username, password }: any) => {
      const user = await User.findOne({ username });
      if(!user) {
        throw new Error(`User '${username}' does not exist`)
      }

      const correctPw = await user.isCorrectPassword(password);
      if(!correctPw) {
        throw new Error(`Incorrect password`)
      }

      return generateToken(user.username, user._id);
    },

    register: async (_: any, { username, password }: any) => {
      const user = await User.create({ username, password });

      return generateToken(user.username, user._id);
    }
  },
};
export default resolvers;

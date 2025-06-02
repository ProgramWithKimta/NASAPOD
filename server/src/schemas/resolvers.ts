// schemas/photo.ts

import FavoriteModel from '../models/favorite.js';
import { FavoriteInput } from './typeFavorite.js';

export const photoResolvers = {
  Query: {
    //get all the liked photos
    getFavorites: async () => {
      return await FavoriteModel.find({});
    },
    // getDailyPhoto: async (_: any, args: { date?: string }) => {
    //   const response = await axios.get('https://api.nasa.gov/planetary/apod', {
    //     params: {
    //       api_key: process.env.NASA_API_KEY,
    //       date: args.date || undefined,
    //     },
    //   });
    //   return response.data;
    // },
  },

  Mutation: {
    //save a photo when the user hits Like button 
    saveFavorite: async (_: any, { input }: { input: FavoriteInput }) => {
      const favorite = await FavoriteModel.create(input);
      return favorite;
    },

    //remove a photo from the favorite gallery 
    deleteFavorite: async (_: any, { id }: { id: string }) => {
      const deleted = await FavoriteModel.findByIdAndDelete(id);
      if (!deleted) {
        throw new Error("Photo not found");
      }
      return `Photo with id ${id} deleted successfully.`;
    },
  },
};

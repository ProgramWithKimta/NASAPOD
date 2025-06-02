// schemas/photo.ts
import FavoriteModel from '../models/favorite.js';
export const photoResolvers = {
    Query: {
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
        saveFavorite: async (_, { input }) => {
            const favorite = await FavoriteModel.create(input);
            return favorite;
        },
        deleteFavorite: async (_, { id }) => {
            const deleted = await FavoriteModel.findByIdAndDelete(id);
            if (!deleted) {
                throw new Error("Photo not found");
            }
            return `Photo with id ${id} deleted successfully.`;
        },
    },
};

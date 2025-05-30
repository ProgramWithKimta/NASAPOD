import axios from 'axios';

const NASA_API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';
const NASA_APOD_URL = 'https://api.nasa.gov/planetary/apod';

async function fetchAPOD(params: Record<string, string | number>) {
  const response = await axios.get(NASA_APOD_URL, {
    params: { api_key: NASA_API_KEY, ...params },
  });
  return response.data;
}

const resolvers = {
  Query: {
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
};

export default resolvers;
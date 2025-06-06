import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import 'dotenv/config'

import { resolvers, typeDefs } from './schemas/index.js'
import db from './config/connection.js';
import { getUserFromToken } from './utils/tokenServices.js';

import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  
  app.use('/graphql', expressMiddleware(server, {
    context: async ({ req }) => {
      let token;

      if(req.headers.authorization) {
        token = req.headers.authorization.split(' ').pop()?.trim();
      }

      if(!token) {
        return { user: undefined }
      }

      const user = getUserFromToken(token);
      return { user }
    }
  }));

  // if we're in production, serve client/dist as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../client/dist')));

    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
    });
  }
  
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  app.listen(PORT, () => {
    console.log(`Use App at http://localhost:${PORT}/`);
  });
};

startApolloServer();

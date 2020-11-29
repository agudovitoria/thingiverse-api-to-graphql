import { ApolloServer } from 'apollo-server';

import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';
import AxiosConfig from './config/AxiosConfig';

AxiosConfig(); // Config Axios global options

const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: ({ req }) => {
    const token = req?.headers?.authorization;

    if (!token) {
      throw new Error('No token or invalid');
    }

    return { token };
  },
});

server.listen().then(({ url }) => console.log(`Server ready at ${url}. `));

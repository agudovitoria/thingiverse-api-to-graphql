import { ApolloClient, InMemoryCache, ApolloClientOptions } from '@apollo/client';
import { getToken } from '../service/StorageService';

const apolloClientOptions: ApolloClientOptions<any> = {
  uri: process.env.REACT_APP_THINGIVERSE_GRAPHQL_BASE_URL,
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${getToken()}`,
  },
} as ApolloClientOptions<any>;

export default new ApolloClient(apolloClientOptions);

import { ApolloServer } from 'apollo-server-express';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import dotenv, { DotenvConfigOutput } from 'dotenv';
import express from 'express';
import listEndpoints, { Endpoint } from 'express-list-endpoints';
import { createServer } from 'http';
import { resolvers, typeDefs } from './schema/Books';
import { loginRouter } from './route/LoginRoutes';
import axiosDebugLog from 'axios-debug-log';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const result: DotenvConfigOutput = dotenv.config();

const { error } = result;

if (!!error) {
  throw new Error(`Invalid .env file: ${error.message}`);
}

const { PORT: port } = process.env;

const app = express();

console.log('📝  Enabling morgan logging');
app.use(morgan('dev'));

console.log('📝  Enabling axios logging');
axiosDebugLog({
  request: (debug: any, { method, headers, url, params }: AxiosRequestConfig) => {
    debug(`(Request) method [${method}] content-type [${headers['content-type']}] url [${url}]  parameters [${params}]`);
  },
  response: (debug: any, { headers, config }: AxiosResponse) => {
    debug(`(Response) content-type [${headers['content-type']}] url [${config?.url}]`);
  },
  error: (debug: any, { code, message }: AxiosError) => {
    debug(`(Error) code [${code}] message [${message}]`);
  }
})

console.log('🔛  Enabling parsers');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log('👮‍♂️  Enabling CORS');
app.use('*', cors());

console.log('🗜  Enabling compression');
app.use(compression());

console.log('🚦  Defining route');
app.use('/api', loginRouter);

console.log(`🏁  Starting Apollo server on /graphql`);
const apolloServer: ApolloServer = new ApolloServer({ typeDefs, resolvers });
apolloServer.applyMiddleware({ app, path: '/graphql' });

console.log(`🏁  Starting Http server`);
const httpServer = createServer(app);

httpServer.listen({ port }, () => {
  console.log(`🚀  Server ready on http://localhost:${process.env.PORT}[/graphql]`);
});

console.log('🚪  Configured endpoints');
listEndpoints(app)
  .map(({ path, methods }: Endpoint) => `[${methods.join(',')}] ${path}`)
  .forEach(it => console.log(`\t→  ${it}`));

import { IResolvers } from 'apollo-server';
import ThingiverseService from '../services/ThingiverseService';

export const resolvers: IResolvers<any, any> = {
  Query: {
    newest: async (parent, args, context, info) => {
      try {
        return await ThingiverseService.getNewest(context.token);
      } catch (error) {
        throw error;
      }
    },
    popular: async (parent, args, context, info) => {
      try {
        return await ThingiverseService.getPopular(context.token);
      } catch (error) {
        throw error;
      }
    },
    featured: async (parent, args, context, info) => {
      try {
        return await ThingiverseService.getFeatured(context.token);
      } catch (error) {
        throw error;
      }
    },
  },
};

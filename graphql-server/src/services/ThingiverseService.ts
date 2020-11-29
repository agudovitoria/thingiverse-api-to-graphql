import axios from 'axios';
import dotenv from 'dotenv';

const { error } = dotenv.config();

if (error) {
  throw error;
}

class ThingiverseService {
  private popularUrl;
  private newestUrl;
  private featuredUrl;

  constructor() {
    const {
      THINGIVERSE_POPULAR_URL,
      THINGIVERSE_NEWEST_URL,
      THINGIVERSE_FEATURED_URL,
    } = process.env;

    if (!THINGIVERSE_POPULAR_URL) {
      throw new Error('Cannot access to pupular things url from environment variables');
    }

    if (!THINGIVERSE_NEWEST_URL) {
      throw new Error('Cannot access to pupular things url from environment variables');
    }

    if (!THINGIVERSE_FEATURED_URL) {
      throw new Error('Cannot access to pupular things url from environment variables');
    }

    this.popularUrl = THINGIVERSE_POPULAR_URL;
    this.newestUrl = THINGIVERSE_NEWEST_URL;
    this.featuredUrl = THINGIVERSE_FEATURED_URL;
  }

  getPopular(token: string) {
    const options = this.getHeadersForToken(token);

    return axios.get(this.popularUrl, options);
  }

  getNewest(token: string) {
    const options = this.getHeadersForToken(token);

    return axios.get(this.newestUrl, options);
  }

  getFeatured(token: string) {
    const options = this.getHeadersForToken(token);
    return axios.get(this.featuredUrl, options);
  }

  private getHeadersForToken(token: string) {
    return {
      headers: {
        authorization: token,
      },
    };
  }
}

export default new ThingiverseService();

import dotenv from 'dotenv';
import { DotenvConfigOutput } from "dotenv/types";

export default class EnvironmentVariablesManager { 
  private envs: Map<string, string> = new Map();

  constructor() { 
    const config: DotenvConfigOutput = dotenv.config();

    if (!!config?.error) {
      throw new Error(`💥 Invalid .env file or cannot parse due to ${config?.error?.message}`);
    }

    const {
      environment,
      THINGIVERSE_URL,
      THINGIVERSE_API_URL,
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URL,
      ACCESS_TOKEN_FROM_CODE_URL,
      VALIDATE_TOKEN_URL,
      LOGIN_REDIRECT_URL,
      USER_INFO_URL
    } = process.env;

    this.envs.set('environment', environment || '');
    this.envs.set('base_url', THINGIVERSE_URL || '');
    this.envs.set('api_base_url', THINGIVERSE_API_URL || '');
    this.envs.set('client_id', CLIENT_ID || '');
    this.envs.set('client_secret', CLIENT_SECRET || '');
    this.envs.set('redirect_url', REDIRECT_URL || '');
    this.envs.set('access_token_from_code_url', ACCESS_TOKEN_FROM_CODE_URL || '');
    this.envs.set('validate_token_url', VALIDATE_TOKEN_URL || '');
    this.envs.set('login_redirect_url', LOGIN_REDIRECT_URL || '');
    this.envs.set('user_info_url', USER_INFO_URL || '');
  }

  isDev(): boolean { 
    return this.envs.get('environment') === 'development';
  }
  
  isTest(): boolean { 
    return this.envs.get('environment') === 'test';
  }

  isProd(): boolean { 
    return this.envs.get('environment') === 'prod';
  }

  getEnvByName(name: string): string{ 

    if (!name) { 
      throw new Error('Need to pass a name for look for name');
    }

    if (!this.envs.has(name)) { 
      throw new Error(`Cannot find env called "${name}"`);
    }

    return this.envs.get(name) || '';
  }
}
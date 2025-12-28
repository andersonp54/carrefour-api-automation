import dotenv from 'dotenv';
import path from 'path';

export function loadEnv() {
  const env = process.env.NODE_ENV || 'default';
  const envFile = path.resolve(process.cwd(), 'config', `${env}.env`);

  dotenv.config({ path: envFile });

  if (!process.env.API_BASE_URL) {
    throw new Error(`API_BASE_URL não encontrado. Verifique o arquivo: config/${env}.env`);
  }
}

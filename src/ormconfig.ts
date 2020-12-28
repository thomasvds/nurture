import * as dotenv from 'dotenv';

import { SnakeNamingStrategy } from './snake-naming.strategy';

import { join } from 'path';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if (!(module as any).hot /* for webpack HMR */) {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
}

dotenv.config({
  path: join(__dirname, `../.${process.env.NODE_ENV}.env`),
});

// Replace \\n with \n to support multiline strings in AWS
const envNames = Object.keys(process.env);
for (let i = 0; i < envNames.length; i += 1) {
  const envName = envNames[i];
  process.env[envName] = process.env[envName].replace(/\\n/g, '\n');
}

function getLogging(): boolean | string[] {
  if (process.env.TESTING) {
    return false;
  }
  if (['staging', 'production'].includes(process.env.NODE_ENV)) {
    return ['error', 'schema', 'warn'];
  }
  return true;
}

module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  namingStrategy: new SnakeNamingStrategy(),
  migrationsRun: true,
  logging: getLogging(),
  entities: [join(__dirname, './modules/**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, './migrations/*{.ts,.js}')],
};

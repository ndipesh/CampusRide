import 'reflect-metadata';
import { DataSource } from 'typeorm';
<<<<<<< HEAD
import { Message } from './entities/Message.js';
import { User } from './entities/User.js';

export const AppDataSource = new DataSource({
=======

const requiredEnvVars = ['DB_HOST', 'DB_PORT', 'DB_USERNAME', 'DB_NAME'] as const;

for (const varName of requiredEnvVars) {
  if (!process.env[varName]) {
    throw new Error(
      `${varName} is missing. Add it to your .env file.\n` +
        'Required variables: DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME\n' +
        'See the Environment_Variables-Setup file on canvas for setup instructions.',
    );
  }
}

export const AppDataSource = new DataSource({
  synchronize: true,
  logging: false,
  entities: ['dist/entities/*.js'],
>>>>>>> 60944adce58517649f9926934d658d8b244ac9ab
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
<<<<<<< HEAD
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Message],
});
=======
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_NAME,
});

await AppDataSource.initialize();
>>>>>>> 60944adce58517649f9926934d658d8b244ac9ab

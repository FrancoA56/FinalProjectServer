import dotenv from 'dotenv';

dotenv.config();

const config = {
 dbUser: process.env.DB_USER,
 dbPassword: process.env.DB_PASSWORD,
 dbHost: process.env.DB_HOST,
 dbName: process.env.DB_NAME,
 dbPort: process.env.DB_PORT,
 dev: process.env.NODE_ENV !== 'production',
 port: process.env.API_PORT,
 host: process.env.API_HOST,
 cors: process.env.CORS,
};

export default config;
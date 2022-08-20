import dotenv from 'dotenv';

dotenv.config();

const MONGO_URL = 'mongodb://localhost:27017/db_teste_teppa';
const JWT_SECRET = process.env.JWT_SECRET || '';

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: 5000
    },
    token: {
        secret: JWT_SECRET
    }
};

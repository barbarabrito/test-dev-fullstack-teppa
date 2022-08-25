import dotenv from 'dotenv';

dotenv.config();

// const MONGO_URL = 'mongodb://localhost:27017/db_teste_teppa';
const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster-teste-api-teppa.rdmb68u.mongodb.net`;
const JWT_SECRET = process.env.JWT_SECRET || '';

const PORT = process.env.PORT || 5000;

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: PORT
    },
    token: {
        secret: JWT_SECRET
    }
};

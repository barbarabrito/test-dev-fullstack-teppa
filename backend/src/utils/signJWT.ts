import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import IUser from '../interfaces/user';

const signJWT = (user: IUser, callback: (error: Error | null, token: string | null) => void): void => {
    try {
        jwt.sign(
            { email: user.email, name: user.name},
            config.token.secret,
            {
                algorithm: 'HS256',
                expiresIn: '8h'
            },
            (error, token) => {
                if (error) {
                    callback(error, null);
                } else if (token) {
                    callback(null, token);
                }
            }
        );
    } catch (error: any) {
        callback(error, null);
    }
};
export default signJWT;

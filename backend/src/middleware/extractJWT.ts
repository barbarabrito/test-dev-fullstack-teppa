import { config } from '../config/config';
import { Request, Response, NextFunction } from 'express';
import jwt, { decode } from 'jsonwebtoken';
import User from '../models/user';

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization?.split(' ')[1];

    if (token) {
        jwt.verify(token, config.token.secret, async (error, decoded) => {
            if (error) {
                return res.status(404).json({
                    message: error,
                    error
                });
            } else {

                let user;

                res.locals.jwt = decoded;
                
                 user = await User.findOne({email: res.locals.jwt.email}).select('-password')
                 
                return res.status(200).json({
                    user
                });
            }
        });
    } else {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
};

export default extractJWT;

import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from '../models/user';
import signJWT from '../utils/signJWT';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import Todo from '../models/todo';


const validateToken = (req: Request, res: Response, next: NextFunction) => {

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

                user = await User.findOne({ email: res.locals.jwt.email }).select('-password')

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

const register = async (req: Request, res: Response, next: NextFunction) => {
    let { name, email, password, confirmPassword } = req.body;

    const userExists = await User.findOne({ email: email });

    if (!name) {
        return res.status(409).json({ message: 'Name is required' });
    }

    if (userExists) {
        return res.status(409).json({ message: 'Email already in use' });
    }

    if (!password) {
        res.status(422).json({ message: 'Password is required' });
        return;
    }

    if (!confirmPassword) {
        res.status(422).json({ message: 'Confirm password' });
        return;
    }

    if (password != confirmPassword) {
        res.status(422).json({ message: 'Passwords do not match' });
        return;
    }

    bcrypt.hash(password, 10, (hashError, hash) => {
        if (hashError) {
            return res.status(500).json({
                message: hashError.message,
                error: hashError
            });
        }

        const _user = new User({
            _id: new mongoose.Types.ObjectId(),
            name,
            email,
            password: hash
        });

        return _user
            .save()
            .then((user) => {
                return res.status(201).json({
                    user
                });
            })
            .catch((error) => {
                return res.status(500).json({
                    message: error.message,
                    error
                });
            });
    });
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    let { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
        return res.status(422).json({ message: 'Email not found' });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
        return res.status(422).json({ message: 'Wrong credentials' });
    } else {
        signJWT(user, (_error, token) => {
            if (_error) {
                return res.status(500).json({
                    message: _error.message,
                    error: _error
                });
            } else if (token) {
                return res.status(200).json({
                    message: 'Auth successful',
                    token: token,
                    user: user
                });
            }
        });
    }
};

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
    User.find()
        .select('-password')
        .exec()
        .then((users) => {
            return res.status(200).json({
                users: users,
                count: users.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getUserTodos = async (req: Request, res: Response, next: NextFunction) => {

    let token = req.headers.authorization?.split(' ')[1];

    if (token) {
        jwt.verify(token, config.token.secret, async (error, decoded) => {
            if (error) {
                return res.status(404).json({
                    message: error,
                    error
                });
            } else {

                res.locals.jwt = decoded;

                Todo.where({ user: new mongoose.Types.ObjectId(res.locals.jwt.id) })
                    .find((err, todos) => {
                        res.json(todos);
                    })
            }
        });
    } else {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }

}


export default { validateToken, register, login, getAllUsers, getUserTodos };

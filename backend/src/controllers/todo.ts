import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import Todo from '../models/todo';
import User from '../models/user';

const createTodo = async (req: Request, res: Response, next: NextFunction) => {

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

                const todo = new Todo({
                    text: req.body.text,
                    done: req.body.done,
                    user: new mongoose.Types.ObjectId(res.locals.jwt.id),
                });
                todo.save().then(todo => {
                    res.json(todo);
                })
            }
        });
    } else {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }

};

const updateTodo = async (req: Request, res: Response, next: NextFunction) => {

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

                const { id } = req.params;

                const updatedTodo = req.body;

                try {
                    await Todo.findByIdAndUpdate(id, updatedTodo);
                    res.status(200).json(updatedTodo);
                } catch (error) {
                    res.status(400).json({ message: error });
                }
            }
        });
    } else {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }

};

const deleteTodo = (req: Request, res: Response, next: NextFunction) => {

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

                const { id } = req.params;

                try {
                    await Todo.findByIdAndRemove(id);
                    res.status(200).json({ message: 'Todo deleted' })
                } catch (error) {
                    res.status(400).json({ message: error });
                }
            }
        });
    } else {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
}

export default { createTodo, updateTodo, deleteTodo };
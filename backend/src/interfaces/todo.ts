import { Document, Types } from 'mongoose';

export default interface ITodo extends Document {
    text: string;
    done: boolean;
    user: Types.ObjectId;
}

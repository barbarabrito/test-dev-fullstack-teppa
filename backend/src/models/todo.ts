import mongoose, { Schema } from 'mongoose';
import ITodo from '../interfaces/todo';

const TodoSchema: Schema = new Schema(
    {
        text: { type: String, required: true },
        done: { type: mongoose.SchemaTypes.Boolean },
        user: { type: mongoose.SchemaTypes.ObjectId }
    },
    {
        timestamps: true
    }
);
export default mongoose.model<ITodo>('Todo', TodoSchema);

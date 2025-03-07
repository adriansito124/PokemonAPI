import mongoose, { Schema, Document } from 'mongoose';

interface ITask extends Document {
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const taskSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    completed: { type: Boolean, required: false },
    createdAt: { type: Date, required: false, default: new Date() },
    updatedAt: { type: Date, required: false, default: new Date() },
});

const Task = mongoose.model<ITask>('Task', taskSchema);

export default Task;
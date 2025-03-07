import { Express } from 'express';
import express from 'express'
import task from './tarefas.ts'
import auth from '../routes/auth.ts'

export default function (app: Express) 
{
    app
    .use(express.json())
    .use('/tasks', task)
    .use(auth)
}
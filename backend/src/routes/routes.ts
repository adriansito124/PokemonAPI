import { Express } from 'express';
import express from 'express'
import poke from './pokemons.ts'
import auth from '../routes/auth.ts'

export default function (app: Express) 
{
    app
    .use(express.json())
    .use('/pokemon', poke)
    .use(auth)
}
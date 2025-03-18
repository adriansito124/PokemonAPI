import express, { Request, Response, Router } from 'express';
import Pokemon from '../models/Pokemon.ts';

class PokeController {

    static async getPokemon(req: Request, res: Response) {
        try {
            const pokemons = await Pokemon.find();
            res.status(200).json(pokemons);
        } catch (error) {
            res.status(400).json({ message: 'Erro ao buscar pokemons', error });
        }
    }



    static async createPokemon(req: Request, res: Response) {

        const { name, base_experience, sprites: { front_shiny, front_default } } = req.body;

        try {
            const poke = new Pokemon({ name, base_experience, sprites: { front_shiny, front_default } });
            await poke.save();
            res.status(201).json(poke);
        } catch (error) {
            res.status(400).json({ message: 'Erro ao criar pokemon', error });
        }

    }

    static async GetOnePoke(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const poke = await Pokemon.findById(id);
            if (!poke) {
                res.status(404).json({ message: 'Pokemon não encontrado' });
            }
            res.status(200).json(poke);
        } catch (error) {
            res.status(400).json({ message: 'Erro ao encontrar pokemon', error });
        }
    }

    static async EditPoke(req: Request, res: Response) {
        const { id } = req.params;
        const { completed } = req.body;

        try {
            const poke = await Pokemon.findByIdAndUpdate(id, { completed }, { new: true });
            if (!poke) {
                res.status(404).json({ message: 'Pokemon não encontrado' });
            }
            res.status(200).json(poke);
        } catch (error) {
            res.status(400).json({ message: 'Erro ao atualizar pokemon', error });
        }
    }

    static async DeletePoke(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const poke = await Pokemon.findByIdAndDelete(id);
            if (!poke) {
                res.status(404).json({ message: 'Pokemon não encontrado' });
            }
            res.status(200).json({ message: 'Pokemon deletado com sucesso' });
        } catch (error) {
            res.status(400).json({ message: 'Erro ao deletar pokemon', error });
        }
    }

}



export default PokeController;
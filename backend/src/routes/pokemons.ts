import express, { Request, Response, Router } from 'express';
import Pokemon from '../models/Pokemon.ts';
import axios from 'axios';

const router: Router = express.Router();
const pokemons: object[] = [];


router.post('', async (req: Request, res: Response) => {
    const { pokemon_id, shiny } = req.body; 

    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon_id}`);
        
        const { name, base_experience, sprites, height, weight, id } = response.data;


        const spriteUrl = shiny ? sprites.front_shiny : sprites.front_default;


        const poke = new Pokemon({
            name,
            base_experience,
            height,
            weight,
            shiny, 
            id,
            sprites: { front_shiny: sprites.front_shiny, front_default: sprites.front_default }
        });

        await poke.save();

        res.status(201).json(poke);
    } catch (error) {
        
        res.status(400).json({ message: 'Erro ao criar pokemon', error });
    }
});



router.get('', async (req: Request, res: Response) => {
    try {
        const pokemons = await Pokemon.find();
        res.status(200).json(pokemons);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao buscar pokemons', error });
    }
});


router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const poke = await Pokemon.findById(id);
        if (!poke) {
            res.status(404).json({ message: 'pokemon não encontrado' });
        }
        res.status(200).json(poke);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao encontrar pokemon', error });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { completed } = req.body;

    try {
        const poke = await Pokemon.findByIdAndUpdate(id, { completed }, { new: true });
        if (!poke) {
            res.status(404).json({ message: 'pokemon não encontrado' });
        }
        res.status(200).json(poke);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar pokemon', error });
    }
});



router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const poke = await Pokemon.findByIdAndDelete(id);
        if (!poke) {
            res.status(404).json({ message: 'pokemon não encontrado' });
        }
        res.status(200).json({ message: 'pokemon deletado com sucesso' });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao deletar pokemon', error });
    }
});

export default router;
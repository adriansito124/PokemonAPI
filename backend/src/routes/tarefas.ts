import express, { Request, Response, Router } from 'express';
import Task from '../models/Task.ts';

const router: Router = express.Router();
const tarefas: object[] = [];


router.post('', async (req: Request, res: Response) => {
    const { title, description } = req.body;

    try {
        const task = new Task({ title, description });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar tarefa', error });
    }
});


router.get('', async (req: Request, res: Response) => {
    try {
        const tarefas = await Task.find();
        res.status(200).json(tarefas);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao buscar tarefas', error });
    }
});


router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const task = await Task.findById(id);
        if (!task) {
            res.status(404).json({ message: 'Tarefa não encontrada' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao encontrar tarefa', error });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { completed } = req.body;

    try {
        const task = await Task.findByIdAndUpdate(id, { completed }, { new: true });
        if (!task) {
            res.status(404).json({ message: 'Tarefa não encontrada' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar tarefa', error });
    }
});



router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            res.status(404).json({ message: 'Tarefa não encontrada' });
        }
        res.status(200).json({ message: 'Tarefa deletada com sucesso' });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao deletar tarefa', error });
    }
});

export default router;
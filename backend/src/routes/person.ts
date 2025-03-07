import express, { Request, Response, Router } from 'express';
import Person from '../models/Person.ts';

const router: Router = express.Router();
const people: object[] = [];


// router
//     .post('/usuarios', (req: Request, res: Response) => {
//         const { nome, sobrenome } = req.body
//         res.status(200).send(`${people.push(req.body)}`);
//     })

router.post('/register', async (req: Request, res: Response) => {
    const { name, age } = req.body;

    try {
        const person = new Person({ name, age });
        await person.save();
        res.status(201).json(person);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar pessoa', error });
    }
});

// router
//     .get('/usuarios', (req: Request, res: Response) => {
//         res.status(200).send(`${people}`);
//     })

// router.get('/people', async (req: Request, res: Response) => {
//     try {
//         const people = await Person.find();
//         res.status(200).json(people);
//     } catch (error) {
//         res.status(400).json({ message: 'Erro ao buscar pessoas', error });
//     }
// });

router.get('/people', async (req: Request, res: Response) => {
    try {
        const people = await Person.find();
        res.status(200).json(people);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao buscar pessoas', error });
    }
});


router.get('/person/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, age } = req.body;

    try {
        const person = await Person.findById(id);
        if (!person) {
            res.status(404).json({ message: 'Pessoa não encontrada' });
        }
        res.status(200).json(person);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao encontrar pessoa', error });
    }
});

router.put('/person/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, age } = req.body;

    try {
        const person = await Person.findByIdAndUpdate(id, { name, age }, { new: true });
        if (!person) {
            res.status(404).json({ message: 'Pessoa não encontrada' });
        }
        res.status(200).json(person);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar pessoa', error });
    }
});

// router
//     .get('/usuarios/:id', (req: Request, res: Response) => {
//         const { id } = req.params
//         res.status(200).send(`Fazendo um get no servidor! id: ${id}`);
//     })

//     .put('/usuarios/:id', (req: Request, res: Response) => {
//         const { id } = req.params;
//         const { nome, sobrenome } = req.body;
//         res.status(200).send(`Pessoa com o id: ${id} foi atualizado para ${nome} ${sobrenome}`)
//     })

//     .patch('/atualizar/:id', (req: Request, res: Response) => {
//         const { id } = req.params;
//         const { nome } = req.body;
//         res.send(`Nome da pessoa com ID ${id} foi atualizado para: ${nome}`);
//     })

router.delete('/person/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const person = await Person.findByIdAndDelete(id);
        if (!person) {
            res.status(404).json({ message: 'Pessoa não encontrada' });
        }
        res.status(200).json({ message: 'Pessoa deletada com sucesso' });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao deletar pessoa', error });
    }
});

//     .delete('/deletar/:id', (req: Request, res: Response) => {
//         const { id } = req.params;
//         res.status(200).send(`Pessoa com o id: ${id} foi deletada `)
//     })

export default router;
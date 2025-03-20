import mongoose, { Schema, Document } from 'mongoose';

interface IPokemon extends Document {
    id: number;
    name: string;
    height: number;
    weight: number;
    base_experience: number;
    shiny: boolean;
    sprites: { front_shiny: string, front_default: string };
}

const pokeSchema: Schema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: false },
    height: { type: Number, required: false },
    weight: { type: Number, required: false },
    base_experience: { type: Number, required: false },
    shiny: { type: Boolean, required: true},
    sprites: {
        front_shiny: { type: String, required: false },
        front_default: { type: String, required: false },
    },
});

const Pokemon = mongoose.model<IPokemon>('Pokemon', pokeSchema);

export default Pokemon;
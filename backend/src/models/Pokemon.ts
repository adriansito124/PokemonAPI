import mongoose, { Schema, Document } from 'mongoose';

interface IPokemon extends Document {
    id: number;
    name: string;
    height: number;
    weight: number;
    base_experience: number;
    sprites: { front_shiny: string, front_default: string };
}

const pokeSchema: Schema = new Schema({
    name: { type: String, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    base_experience: { type: Number, required: true },
});

const Pokemon = mongoose.model<IPokemon>('Pokemon', pokeSchema);

export default Pokemon;
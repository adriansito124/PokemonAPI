'use client'
import Image from "next/image";
import { Task } from "@/components/Task";
import { ROUTES } from "@/constants/routes";
import { useEffect, useState } from "react";
import { api } from "@/constants/api";
import axios from "axios";
import Link from "next/link";

interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: { front_shiny: string };
}

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [poke, setPoke] = useState<number>(0);

  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [data, setData] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [ok, setOk] = useState(false);

  const fetchPokemons = async (pageNumber: number) => {
    try {

      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${20 * (pageNumber - 1)}`
      );

      const results = response.data.results;
      const pokemonPromises = results.map((item: { url: string }) => axios.get(item.url)); 

      const pokemonResponses = await Promise.all(pokemonPromises);

      const pokemonData: Pokemon[] = pokemonResponses.map((res) => res.data);

      pokemonData.sort((a: Pokemon, b: Pokemon) => a.id - b.id);

      setPokemons(pokemonData);
    } catch (error) {
      console.error("Erro ao buscar pokémons: ", error);
    } finally {
      setLoading(false);  
    }
  };

  useEffect(() => {
    fetchPokemons(page);  
  }, [page]);

  const closeModal = () => {
    setTitle("");
    setDescription("");
    setModal(false);
  }

  const openModal = () => {
    setPoke(Math.floor(Math.random() * 1025) + 1)
    setModal(true);
  }

  const handleNewTask = async () => {
    await api.post("/tasks",
      {
        "title": title,
        "description": description
      },
      {
        headers: {

        }
      })
      .then((res) => {
        alert("Tarefa cadastrada com sucesso")
        window.location.reload()
      })
      .catch((e) => {
        alert(e.response.data.message)
      })
      .finally(() => setModal(false))
  }

  const style =
  {
    main: "min-h-screen w-full bg-blue-500 flex justify-center items-center text-gray-50",
    botao: "p-2 bg-blue-700 rounded-md px-5 hover:bg-blue-800 transition",
  }

  return (
    <>
      <main className={style.main}>
        <div className="fixed top-0 flex items-center flex-col w-full bg-blue-600 justify-center border-b-2 border-white">
          <h1 className="text-4xl font-semibold pt-5">PokeAPI</h1>
          <div className="justify-center gap-60 flex p-5 text-2xl w-4/5  rounded-sm">
            <button className={style.botao} onClick={() => openModal()}>Capturar</button>
            <Link href={"2"} className={style.botao}>Pokemons Selvagens</Link>
          </div>
        </div>
        <div className="w-full flex flex-row justify-center flex-wrap gap-5 p-20 pt-40">
          {pokemons.map((item) => (
            <div className="w-72 flex flex-col items-center bg-blue-600 rounded-lg border-white border-2 p-3">
              <div className="flex justify-start w-full gap-2">
                <h1 className="text-xl font-semibold">{item.id}</h1>
                <h1 className="text-xl font-semibold">{item.name}</h1>
                <div className="w-full h-8 flex justify-end">
                  {item.base_experience < 100 ? <div className="rounded-full bg-green-600 w-6 flex p-1 justify-center items-center"><p>1</p></div> : item.base_experience < 150 ? <div className="rounded-full bg-lime-500 w-6 flex p-1 justify-center items-center"><p>2</p></div> : item.base_experience < 200 ? <div className="rounded-full bg-yellow-500 w-6 flex p-1 justify-center items-center"><p>3</p></div> : item.base_experience < 250 ? <div className="rounded-full bg-orange-500 w-6 flex p-1 justify-center items-center"><p>4</p></div> : <div className="rounded-full bg-red-500 w-6 flex p-1 justify-center items-center"><p>5</p></div>}
                </div>
              </div>
              <Image src={item.sprites.front_shiny} alt={item.name} width={120} height={120} />
              <div className="flex justify-between w-full px-3">
                <p className="text-lg">Altura: {item.height / 10}m</p>
                <p className="text-lg">Peso: {item.weight / 10}Kg</p>
              </div>
            </div>
          ))}
        </div>
        <div className=" fixed bottom-5">
          <button
            className="p-2 bg-blue-700 rounded-md px-5 hover:bg-blue-800 transition border-2"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))} 
            disabled={page === 1}
          >
            Página Anterior
          </button>
          <button
            className="p-2 bg-blue-700 rounded-md px-5 hover:bg-blue-800 transition ml-2 border-2"
            onClick={() => setPage((prev) => prev + 1)} 
          >
            Próxima Página
          </button>
        </div>
      </main>
    </>
  );
}
function setData(data: any) {
  throw new Error("Function not implemented.");
}


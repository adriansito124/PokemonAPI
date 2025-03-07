'use client'
import Image from "next/image";
import { Task } from "@/components/Task";
import { ROUTES } from "@/constants/routes";
import { useEffect, useState } from "react";
import { api } from "@/constants/api";
import logo from "@/assets/Logo.png"
import ash from "@/assets/ash.png"

export default function Home() {

  const style =
  {
    main: "min-h-screen w-full bg-blue-500 flex flex-col justify-start items-center text-gray-50 gap-20 font-sans p-10",
    botao: "p-2 bg-blue-700 text-xl font-semibold rounded-lg px-8 hover:bg-blue-800 hover:text-slate-200 transition",
  }

  return (
    <>
      <main className={style.main}>
        <div className="flex justify-center fixed pt-4 pb-4 top-0 bg-blue-600 w-full">
          <h1 className="font-bold text-4x font-mono">Pokédex Pokémon</h1>
        </div>

        <Image src={logo} className="w-full max-w-80 mt-20" alt="logo pokwmon"></Image>
        <button className={style.botao}>Iniciar</button>

      </main>
    </>
  );
}



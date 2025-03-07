'use client'
import Image from "next/image";
import { Task } from "@/components/Task";
import { ROUTES } from "@/constants/routes";
import { useEffect, useState } from "react";
import { api } from "@/constants/api";

interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default function Home() {
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [data, setData] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [ok, setOk] = useState(false);


  const closeModal = () => {
    setTitle("");
    setDescription("");
    setModal(false);
  }

  const openModal = () => {
    setModal(true);
  }

  const closeModal2 = () => {
    setModal2(false);
  }

  const openModal2 = (taskId: string, taskCompleted: boolean) => {
    setId(taskId);
    setOk(taskCompleted);
    setModal2(true);
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

  const handleEditTask = async () => {
    await api.put(`/tasks/${id}`,
      {
        "completed": ok
      },
      {
        headers: {

        }
      })
      .then((res) => {
        alert("Tarefa editada com sucesso")
        window.location.reload()
      })
      .catch((e) => {
        alert(e.response.data.message)
      })
      .finally(() => setModal2(false))
  }

  useEffect(() => {
    api.get(
      `/tasks`,
      {
        headers: {}
      }
    ).then((res) => {
      console.log(res)
      setData(res.data)
    })
      .catch((e) => { })
  }, [])



  const style =
  {
    main: "min-h-screen w-full bg-slate-900 flex justify-center items-center text-gray-50",
    botao: "p-2 bg-slate-700 rounded-md px-5 hover:bg-slate-600 transition",
  }

  return (
    <>
      <main className={style.main}>
        <div className="fixed top-0 flex items-center flex-col w-full bg-slate-800 justify-center">
          <h1 className="text-4xl font-semibold pt-5">Tarefas</h1>
          <div className="justify-center gap-96 flex p-5 text-2xl w-4/5  rounded-sm">
            <button className={style.botao} onClick={() => openModal()}>Adicionar</button>
          </div>
        </div>
        <div className="w-full flex items-center flex-col">
          <table className="bg-slate-700 dark:bg-slate-100 flex justify-around  rounded-md mt-8">
            <tbody>
              {data.map((item) => (
                <Task key={item._id} title={item.title} description={item.description} completed={item.completed} createdAt={item.createdAt} updatedAt={item.updatedAt} openModalEdit={() => openModal2(item._id, item.completed)} ></Task>
              ))}
            </tbody>
          </table>

        </div>
        {/* Modal nova tarefa*/}
        <div className={modal ? "fixed inset-0 flex items-center justify-center text-white dark:text-black bg-black bg-opacity-50 z-50" : "disabled z-0 fixed opacity-0"}>
          <div className="bg-zinc-800 dark:bg-slate-50 p-8 rounded-lg shadow-lg flex items-center justify-center flex-col" >
            <div className="p-2 flex flex-col w-96 bg-opacity-50 z-50">
              <h2 className="text-xl font-semibold">Nova tarefa</h2>
              <form className="flex flex-col">
                <label htmlFor="" className="mt-8">Titulo</label>
                <input type="text" placeholder="Titulo" className="text-gray-800 border-2 rounded-[5px] p-1 mt-1 text-[13px]" value={title} onChange={(e) => { setTitle(e.target.value) }} ></input>
                <label htmlFor="" className="mt-8">Descrição</label>
                <input type="text" placeholder="descrição" className="text-gray-800 border-2 rounded-[5px] p-1 mt-1 text-[13px]" value={description} onChange={(e) => { setDescription(e.target.value) }} ></input>
              </form>
              <div className="flex justify-between mt-10">
                <button onClick={() => closeModal()} className="flex justify-center items-center h-8 text-[15px] bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">Cancelar</button>
                <button onClick={() => handleNewTask()} className="flex justify-center items-center h-8 text-[15px] bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">Confirmar</button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal nova tarefa*/}
        <div className={modal2 ? "fixed inset-0 flex items-center justify-center text-white dark:text-black bg-black bg-opacity-50 z-50" : "disabled z-0 fixed opacity-0"}>
          <div className="bg-zinc-800 dark:bg-slate-50 p-8 rounded-lg shadow-lg flex items-center justify-center flex-col" >
            <div className="p-2 flex flex-col w-96 bg-opacity-50 z-50">
              <h2 className="text-xl font-semibold">Editar tarefa</h2>
              <form className="flex flex-col">
                <label htmlFor="" className="mt-8">Completa</label>
                <input type="checkbox" checked={ok} onChange={(e) => { setOk(e.target.checked) }}></input>
              </form>
              <div className="flex justify-between mt-10">
                <button onClick={() => closeModal2()} className="flex justify-center items-center h-8 text-[15px] bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">Cancelar</button>
                <button onClick={() => handleEditTask()} className="flex justify-center items-center h-8 text-[15px] bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">Confirmar</button>
              </div>
            </div>
          </div>
        </div>


      </main>
    </>
  );
}
function setData(data: any) {
  throw new Error("Function not implemented.");
}


interface Task {

    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
    openModalEdit: () => void;
}

export const Task: React.FC<Task> = ({ title, description, completed, createdAt, updatedAt, openModalEdit }) => {

    // return (
    //     <div className="flex-row w-1/2 justify-between flex gap-2 bg-slate-700 text-base p-3 rounded-md items-center">
    //         {completed == true ? <div className="rounded-full bg-lime-600 h-5 w-5"></div> : <div className="rounded-full bg-red-600 h-5 w-5"></div>}
    //         <div className="flex-row w-full justify-between flex gap-2 text-base items-center ps-5">
    //             <div className="flex-row w-full justify-around flex">
    //                 <p className="text-xl">{title}</p>
    //                 <div className="w-0.5 h-8 bg-slate-400"></div>
    //                 <p>{description}</p>
    //             </div>
    //             <div className="w-0.5 h-8 bg-slate-400"></div>
    //             <div className="flex-row w-full justify-around flex gap-2">
    //                 <p>{new Date(createdAt).toLocaleString("pt-BR")}</p>
    //                 <div className="w-0.5 h-8 bg-slate-400"></div>  
    //                 <p>{new Date(updatedAt).toLocaleString("pt-BR")}</p>
    //             </div>
    //             <div className="w-0.5 h-8 bg-slate-400"></div>

    //         </div>
    //         <div className="flex flex-row gap-3">
    //             <button className="rounded-full flex justify-center ps-1 items-center bg-slate-400 h-8 w-8 hover:scale-105 hover:bg-slate-300">📝</button>
    //             <button className="rounded-full flex justify-center items-center bg-slate-400 h-8 w-8 hover:scale-105 hover:bg-slate-300">❌</button>
    //         </div>
    //       </div>
    // );

    return (
        <tr className="border-t border-[#D9D9D9] bg-slate-700 border-b ps-2 border-x gap-6 ">
            <td className="px-2">
                {completed == true ? <div className="rounded-full bg-lime-600 h-5 w-5"></div> : <div className="rounded-full bg-red-600 h-5 w-5"></div>}
            </td>
            <td className="text-start text-[16px] px-2">{title}</td>
            <td className="text-start text-[16px] px-2">{description}</td>
            <td className="text-start text-[16px] px-2">{new Date(createdAt).toLocaleString("pt-BR")}</td>
            <td className="text-start text-[16px] px-2">{new Date(updatedAt).toLocaleString("pt-BR")}</td>
            <td className="">
                <button className="rounded-full flex justify-center  items-center bg-slate-500 h-8 w-8 hover:scale-105 hover:bg-slate-400" onClick={openModalEdit}>📝</button>
            </td>
            <td className="py-2 pe-2">
                <button className="rounded-full flex justify-center items-center bg-slate-500 h-8 w-8 hover:scale-105 hover:bg-slate-400">❌</button>
            </td>
        </tr>
    );
}
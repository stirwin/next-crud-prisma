'use client'

import { useRouter } from "next/navigation"



export default function TaskCard({ task }) {
   const router = useRouter();
   
   return (
        <div onClick={()=> router.push('task/edit/'+task.id)}>
            <div key={task.id} className="bg-slate-900 p-3 hover:bg-slate-600 hover:cursor-pointer hover:scale-105 transition-all hover:rounded">
                <h1 className="font-bold  text-2xl mb-2">{task.title}</h1>
                <p className="">{task.description}</p>
                <p>{new Date(task.createdAt).toLocaleDateString()}</p>
            </div>

        </div>
    )
}
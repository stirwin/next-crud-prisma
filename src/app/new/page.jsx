'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function New({ params }) {

  //const de use router para redirecionar
  const router = useRouter();
  //obtiene los datos para enviarlos si esta en edit
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");



  //accede a los datos del usuario dependiendo de la ruta en la que se este
  useEffect(() => {
    if (params.id) {
      fetch(`/api/task/${params.id}`)
        .then(res => res.json())
        .then(data => {
          setTitle(data.title)
          setDescription(data.description)
        });
    }
  }, [])

  //captura los datos del formulario
  const onSubmit = async (e) => {
    //evita que el formulario se recargue
    e.preventDefault()
    console.log(e);
    //captura los datos
    const title = e.target.title.value
    const description = e.target.description.value

    if (params.id) {
      const res = await fetch(`/api/task/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({ title, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      //se obtiene la respuesta
      const data = await res.json();
      console.log(data);

    } else {
      //evia los datos 
      const res = await fetch('/api/task', {
        method: 'POST',
        body: JSON.stringify({ title, description }),
        headers: {
          'Contet-Type': 'application/json'
        }
      });

      //se obtiene la respuesta
      const data = await res.json();
      console.log(data);
    }

    //refresca los datos
    router.refresh();
    //redirige depues que envie 
    router.push("/");
  }

  return (
    <div className='h-screen flex justify-center items-center'>
      <form className='bg-slate-800 p-10'
        onSubmit={onSubmit}>

        <label htmlFor="title" className='font-bold text-sm'>
          Titulo de la tarea
        </label>
        <input type="text"
          id='title'
          className='border border-gray-400 p-2 mb-4 w-full text-black'
          placeholder='titulo'
          //recibe el valor de lo que venga en el set
          onChange={(e) => setTitle(e.target.value)}
          value={title} />

        <textarea rows="3" id='description' className='border border-gray-400 p-2 mb-4 w-full text-black'
          placeholder='describe la tarea'
          onChange={(e) => setDescription(e.target.value)}
          value={description}></textarea>

        <div className="flex justify-between">
          <button className=' border p-2 rounded bg-blue-500'
            type="submit">crear</button>

          {params.id && (
            <button className="bg-red-500 border p-2 rounded" type="button"
              onClick={async () => {
                const res = await fetch(`/api/task/${params.id}`, {
                  method: "DELETE",
                })
                const data = await res.json();
                router.refresh();
                router.push("/");
              }}> Delete </button>
          )

          }
        </div>

      </form>

    </div>
  )
}

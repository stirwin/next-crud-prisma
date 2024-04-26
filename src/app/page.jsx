import TaskCard from "@/components/TaskCard";
import { prisma } from "@/libs/prisma";

async function LoadTask() {

  //CON PRISMA
  return await prisma.task.findMany();

  //FETCH NORMAL
  //const res = await fetch('https://sturdy-pancake-qrgpvrpgqr439xjq-3000.app.github.dev/api/task')
  //const data =await res.json();
  //console.log(data);
}


async function HomePage() {

  const tasks = await LoadTask();
  console.log(tasks);
  return (
    <section className="container mx-auto">
      <div className="grid grid-cols-3 gap-3 mt-10 ">
        {tasks.map(task => (
        <TaskCard task={task}/>
        ))

        }
      </div>
    </section>

  );
}

export default HomePage
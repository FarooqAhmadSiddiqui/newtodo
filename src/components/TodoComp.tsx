import AddTodo from "./AddTodo";
import DeleteItem from "./DeleteItem";
import EditItem from "./EditItem";
import SearchBox from "./Search";
import { config } from "dotenv";

config({ path: ".env.development.local" });

export type MytodoType = {
  id: number;
  task: string;
};
export const fetchData = async () => {
  const path = process.env.MY_URL;
  console.log("env todocomp", path);
  //fetch data from the server
  let res = await fetch(`http://localhost:3000/api/todo`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Data fetching failed");
  return await res.json();
};

export default async function Todo() {
  let todoData = await fetchData();
  let myTodo: MytodoType[] = todoData.data;
  // console.log("myTodo:", myTodo);

  return (
    <main className="mx-auto mt-10 rounded-xl p-10 max-w-[900px] bg-[#fecaca]">
      <div className=" flex justify-center gap-4">
        <AddTodo />
        <SearchBox myTodo={myTodo} />
      </div>
      <div className="grid grid-cols-2 gap-6 mt-10">
        {myTodo.map((item: MytodoType, i: number) => {
          return (
            <div className="" key={i}>
              <div className="relative flex items-center bg-green-300 justify-between gap-2 py-2 px-2 rounded-md border-2">
                <div className="absolute flex justify-center items-center bg-orange-600 w-4 h-4 rounded-full -top-1 -left-1 text-xs">
                  {i + 1}
                </div>
                <div className="flex gap-2 pl-2">
                  <div className="text-lg">{item.task}</div>
                </div>
                <div className="flex gap-1">
                  <EditItem id={item.id} task={item.task} />
                  <DeleteItem id={item.id} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

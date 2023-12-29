"use client";
import { MdDeleteOutline } from "react-icons/md";
import { fetchData } from "./TodoComp";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

function DeleteItem({ id }: { id: number }) {
  const { refresh } = useRouter();
  const handleDelete = async (id: number) => {
    let data = await fetch(`http://localhost:3000/api/todo`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    let res = await data.json();
    console.log(res);
    fetchData();
    refresh();
  };
  return (
    <div>
      <div className="flex gap-1">
        <Button
          size={"sm"}
          onClick={() => handleDelete(id)}
          className="bg-red-500 text-xs border-2 text-white"
        >
          <MdDeleteOutline />
        </Button>
      </div>
    </div>
  );
}

export default DeleteItem;

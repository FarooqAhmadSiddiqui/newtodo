"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { fetchData } from "./TodoComp";
import { useRouter } from "next/navigation";

const EditItem = ({ id, task }: { id: number; task: string }) => {
  const [toggle, setToggle] = useState(false);
  const [newtask, setNewTask] = useState(task);
  const { refresh } = useRouter();
  const handleInputChange = (e: any) => {
    setNewTask(e.target.value);
  };
  const handleEdit = async (id: number, task: string) => {
    let data = await fetch(`http://localhost:3000/api/todo`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        taskname: task,
      }),
    });
    // console.log("my id is:", id);
    // console.log("my task is:", task);
    let res = await data.json();
    console.log(res);
    fetchData();
    toggleDialog();
    refresh();
  };

  useEffect(() => {
    fetchData();
  }, [handleEdit]);

  const toggleDialog = () => {
    setToggle(!toggle);
  };

  return (
    <AlertDialog open={toggle} onOpenChange={toggleDialog}>
      <AlertDialogTrigger>
        <Button size={"sm"} className="bg-gray-500 text-xs border-2 text-white">
          <AiOutlineEdit />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="pl-2">
          <AlertDialogTitle>Edit Your Todo task</AlertDialogTitle>
        </AlertDialogHeader>
        <div>
          <div className="">
            <input
              value={newtask}
              onChange={(e) => handleInputChange(e)}
              className="w-full rounded-md mb-4 p-2 ring-1 ring-violet-300 hover:ring-violet-800"
            />
          </div>
          <div className="flex items-center gap-2 justify-end">
            <Button onClick={() => handleEdit(id, newtask)}>
              <AiOutlineEdit className="pr-1" /> Edit Todo
            </Button>
            <Button variant={"destructive"} onClick={toggleDialog}>
              Cancel
            </Button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditItem;

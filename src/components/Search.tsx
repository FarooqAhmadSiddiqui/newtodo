"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MytodoType } from "./TodoComp";
import EditItem from "./EditItem";
import DeleteItem from "./DeleteItem";

export default function SearchBox({ myTodo }: { myTodo: MytodoType[] }) {
  const [filterText, setFilterText] = useState("");

  const rows: MytodoType[] = [];
  myTodo.forEach((todo) => {
    let index = todo.task.toLowerCase().indexOf(filterText.toLowerCase());
    if (index !== -1) {
      rows.push(todo);
      // console.log("rows are here:", rows);
    }
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FaSearch size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Find Todo</DialogTitle>
          <DialogDescription>
            Please insert your task details to find out if it is present or not
            in database
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="search"
              placeholder="search task"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="col-span-4"
            />
          </div>
        </div>
        <div className="max-h-[160px] overflow-auto p-2">
          {rows.map((item: MytodoType, i: number) => {
            return (
              <div className="mb-1" key={i}>
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
      </DialogContent>
    </Dialog>
  );
}

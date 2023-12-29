"use client";
import { MdFileDownloadDone } from "react-icons/md";
import React, { useState } from "react";
import { fetchData } from "./TodoComp";
import { useRouter } from "next/navigation";

const AddTodo = () => {
  const [taskname, setTaskname] = useState("");
  const [id, setId] = useState("");
  const { refresh } = useRouter();

  const AddData = async () => {
    let data = await fetch(`http://localhost:3000/api/todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskname,
      }),
    });
    const res = await data.json();
    fetchData();
    setTaskname("");
    setId("");
    refresh();
  };

  return (
    <div className="flex gap-6">
      <input
        value={taskname}
        id="taskname"
        onChange={(e) => setTaskname(e.target.value)}
        className="py-2 ring-1 ring-purple-500 px-3 border-1 rounded-md w-[70%]"
        placeholder="Enter your task here"
        type="text"
      />
      <input
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="py-2 px-3 border-1 ring-1 ring-purple-500 rounded-md w-[30%]"
        placeholder="task id"
        type="text"
      />
      <button
        onClick={AddData}
        className="bg-blue-600 text-lg border-1 px-2 py-1 ring-1 ring-purple-500 rounded-md text-white"
      >
        <MdFileDownloadDone size={26} />
      </button>
    </div>
  );
};

export default AddTodo;

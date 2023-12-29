import Todo from "@/components/TodoComp";
import React from "react";

const Home = () => {
  return (
    <div>
      <h1 className="font-bold text-center text-4xl">My Todo Application</h1>
      <Todo />
    </div>
  );
};

export default Home;

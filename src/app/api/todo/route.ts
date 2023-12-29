import { NewTodo, Todo, db, todos } from "@/app/lib/drizzle";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";


export const GET = async(request:NextRequest) => {
    const data = await db.select({id:todos.id,task:todos.taskname}).from(todos)
  return NextResponse.json({message:"Get successful", data:data})
}


export const POST = async(request:NextRequest) => {
  const body = await request.json()
  const newTodo:NewTodo = {
    taskname:body.taskname,
    isDone:false
  }
  const insertedTodo: Todo[] = await db.insert(todos).values(newTodo).returning();

  return NextResponse.json({message:"Post successful", response:body.task, data:insertedTodo[0]})
}
export async function DELETE(request: NextRequest) {

  const req = await request.json();
  const id = req.id;
  const rows = await db.delete(todos).where(eq(todos.id,id));
  //const { rows } = await sql`INSERT INTO todos (title) VALUES (${title})`;

  return NextResponse.json({ message: "todo deleted successfully! " });
}

export async function PUT(request: NextRequest) {

  const req = await request.json();
  const id = req.id;
  const taskname = req.taskname;
  const rows = await db.update(todos).set({taskname}).where(eq(todos.id,id));
  //const { rows } = await sql`INSERT INTO todos (title) VALUES (${title})`;

  return NextResponse.json({ message: "todo updated successfully! " });
}
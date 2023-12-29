import {
    pgTable,
    serial,
    text,
    varchar,
    timestamp,
    boolean,
  } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { InferModel } from "drizzle-orm";
import { sql } from "@vercel/postgres";

  export const todos = pgTable("todo", {
    id: serial("id").primaryKey(),
    taskname: varchar("task", {
        length:255
    }),
    isDone:boolean("is_done").notNull(),
  });
  export type Todo = InferModel<typeof todos>
  export type NewTodo = InferModel<typeof todos , "insert">
  export const db = drizzle(sql);


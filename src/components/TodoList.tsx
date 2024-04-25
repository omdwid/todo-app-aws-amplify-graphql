"use client";
import React from "react";
import type { Todo } from "@/API";
import type { DeleteTodoMutation } from "@/API";
import { FaTrashAlt } from "react-icons/fa";

interface Props {
  todos: Array<Todo>;
  deleteTodo: (id: string) => Promise<void>;
}

const TodoList = ({ todos, deleteTodo }: Props) => {
  return (
    <div className="flex flex-col gap-3 w-full border-[3px] border-blue p-5 rounded-lg">
      {(!todos || todos.length === 0 ) && (
          <div className="text-blue">
            <p>No todos, please add one.</p>
          </div>
        )}
      {todos.map((todo, i) => {
        return (
          <div
            key={todo.id}
            className={`flex p-3 justify-between items-center border-b-2 border-blue text-blue ${
              i === todos.length - 1 && "border-none"
            }`}
          >
            <p className="list-none">{todo.name}</p>
            <FaTrashAlt
              color="#52E5FE"
              size="1.25rem"
              className="cursor-pointer"
              onClick={() => deleteTodo(todo.id)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;

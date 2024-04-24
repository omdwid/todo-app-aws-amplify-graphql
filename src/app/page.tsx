import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import * as mutations from "@/graphql/mutations";
// 1. Add the queries as an import
import * as queries from "@/graphql/queries";
import { FaTrashAlt } from "react-icons/fa";

import config from "@/amplifyconfiguration.json";

const cookiesClient = generateServerClientUsingCookies({
  config,
  cookies,
});

async function createTodo(formData: FormData) {
  "use server";
  const { data } = await cookiesClient.graphql({
    query: mutations.createTodo,
    variables: {
      input: {
        name: formData.get("name")?.toString() ?? "",
      },
    },
  });

  console.log("Created Todo: ", data?.createTodo);

  revalidatePath("/");
}

export default async function Home() {
  // 2. Fetch additional todos
  const { data, errors } = await cookiesClient.graphql({
    query: queries.listTodos,
  });

  const todos = data.listTodos.items;

  return (
    <div className="h-screen w-full">
      <div className="mx-auto mt-[100px] flex flex-col items-center gap-5 min-h-1/2 max-w-[500px] bg-zinc-900 p-5 rounded-md">
        <form action={createTodo} className="flex gap-2 w-full">
          <input
            name="name"
            placeholder="Add a todo"
            className="bg-black text-white border border-1 w-[85%] rounded-md border-white focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 py-1 px-2 rounded-md w-[15%]"
          >
            Add
          </button>
        </form>

        {/* 3. Handle edge cases & zero state & error states*/}
        {(!todos || todos.length === 0 || errors) && (
          <div>
            <p>No todos, please add one.</p>
          </div>
        )}

        {/* 4. Display todos*/}
        <div className="flex flex-col gap-3 w-full">
          {todos.map((todo) => {
            return (
              <div key={todo.id} className="flex justify-between items-center">
                <p className="list-none">
                  {todo.name}
                </p>
                <FaTrashAlt color="red" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

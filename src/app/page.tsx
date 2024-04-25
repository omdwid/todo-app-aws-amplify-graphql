import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import * as mutations from "@/graphql/mutations";
// 1. Add the queries as an import
import * as queries from "@/graphql/queries";

import config from "@/amplifyconfiguration.json";
import Header from "@/components/Header";
import TodoList from "@/components/TodoList";

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

async function deleteTodo(id: string) {
  "use server";
  const { data } = await cookiesClient.graphql({
    query: mutations.deleteTodo,
    variables: {
      input: {
        id: id,
      },
    },
  });

  console.log("Deleted Todo Successfully: ", data?.deleteTodo);

  revalidatePath("/");
}

export default async function Home() {
  // 2. Fetch additional todos
  const { data, errors } = await cookiesClient.graphql({
    query: queries.listTodos,
  });

  const todos = data.listTodos.items;

  return (
    <div className="h-screen w-full bg-darkBlue">
      <Header />
      
      <div className="mx-auto mt-[100px] flex flex-col items-center gap-10 min-h-1/2 max-w-[500px] p-5 rounded-md">
        <form action={createTodo} className="flex gap-2 w-full">
          <input
            name="name"
            className="bg-blue p-3 max-md:p-1 text-white border border-1 w-[85%] rounded-md border-white focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 py-1 px-2 max-md:px-1 max-md:text-sm rounded-md w-[15%] bg-blue font-semibold"
          >
            Add
          </button>
        </form>

        {/* 3. Handle edge cases & zero state & error states*/}
        

        {/* 4. Display todos*/}
        {/* <div className="flex flex-col gap-3 w-full border-[3px] border-blue p-5 rounded-lg">
          {todos.map((todo, i) => {
            return (
              <div key={todo.id} className={`flex p-3 justify-between items-center border-b-2 border-blue text-blue ${i === todos.length - 1 && "border-none"}`}>
                <p className="list-none">
                  {todo.name}
                </p>
                <FaTrashAlt color="#52E5FE" size="1.25rem" />
              </div>
            );
          })}
        </div> */}

        <TodoList todos={todos} deleteTodo={deleteTodo} />
      </div>
    </div>
  );
}

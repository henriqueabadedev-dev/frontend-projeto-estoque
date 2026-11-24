import axios from "axios";

export async function TodosClientes<T>(search: string) {
  const response = await axios.get<T>(
    ` http://localhost:3000/homepage/todosClientes`,
    {
      params: {
        search: search,
      },
    }
  );
  return response;
}

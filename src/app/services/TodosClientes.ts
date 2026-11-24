import axios from "axios";

export async function TodosClientes<T>(search: string) {
  const response = await axios.get<T>(
    ` https://backend-projeto-estoque.onrender.com/homepage/todosClientes`,
    {
      params: {
        search: search,
      },
    }
  );
  return response;
}

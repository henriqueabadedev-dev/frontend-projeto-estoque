import axios from "axios";

export async function DeleteClient<T>(id: string) {
  const response = await axios.delete<T>(
    ` https://backend-projeto-estoque.onrender.com/homepage/deleteClient/${id}`
  );
  return response;
}

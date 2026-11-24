import axios from "axios";

export async function FindClientById<T>(id: string) {
  const response = await axios.get<T>(
    ` https://backend-projeto-estoque.onrender.com/homepage/findClientById/${id}`
  );
  return response;
}

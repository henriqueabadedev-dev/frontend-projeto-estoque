import axios from "axios";

export async function FindVendaById<T>(id: string) {
  const response = await axios.get<T>(
    `  https://backend-projeto-estoque.onrender.com/homepage/findVendasById/${id}`
  );
  return response;
}

import axios from "axios";

export async function FindVendaById<T>(id: string) {
  const response = await axios.get<T>(
    `  http://localhost:3000/homepage/findVendasById/${id}`
  );
  return response;
}

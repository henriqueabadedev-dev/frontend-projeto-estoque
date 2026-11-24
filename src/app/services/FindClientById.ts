import axios from "axios";

export async function FindClientById<T>(id: string) {
  const response = await axios.get<T>(
    ` http://localhost:3000/homepage/findClientById/${id}`
  );
  return response;
}

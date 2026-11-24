import axios from "axios";

export async function DeleteClient<T>(id: string) {
  const response = await axios.delete<T>(
    ` http://localhost:3000/homepage/deleteClient/${id}`
  );
  return response;
}

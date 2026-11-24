import axios from "axios";

export async function DeleteVenda<T>(id: string) {
  const response = await axios.delete<T>(
    ` http://localhost:3000/homepage/DeleteVenda/${id}`
  );
  return response;
}

import axios from "axios";

export async function DeleteProduct<T>(id: string) {
  const response = await axios.delete<T>(
    ` http://localhost:3000/homepage/deleteProduct/${id}`
  );
  return response;
}

import axios from "axios";

export async function DeleteProduct<T>(id: string) {
  const response = await axios.delete<T>(
    ` https://backend-projeto-estoque.onrender.com/homepage/deleteProduct/${id}`
  );
  return response;
}

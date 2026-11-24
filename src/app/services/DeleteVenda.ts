import axios from "axios";

export async function DeleteVenda<T>(id: string) {
  const response = await axios.delete<T>(
    ` https://backend-projeto-estoque.onrender.com/homepage/DeleteVenda/${id}`
  );
  return response;
}

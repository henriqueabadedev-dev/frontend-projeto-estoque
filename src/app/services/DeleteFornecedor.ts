import axios from "axios";

export async function DeleteFornecedor<T>(id: string) {
  const response = await axios.delete<T>(
    ` https://backend-projeto-estoque.onrender.com/homepage/deleteFornecedor/${id}`
  );
  return response;
}

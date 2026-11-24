import axios from "axios";

export async function DeleteFornecedor<T>(id: string) {
  const response = await axios.delete<T>(
    ` http://localhost:3000/homepage/deleteFornecedor/${id}`
  );
  return response;
}

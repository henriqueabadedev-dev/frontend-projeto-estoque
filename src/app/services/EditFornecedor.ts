import axios from "axios";

export async function EditFornecedortRoutePost<T>(id: string, data: any) {
  const response = await axios.put<T>(
    ` https://backend-projeto-estoque.onrender.com/homepage/editFornecedor/${id}`,
    data
  );
  return response;
}

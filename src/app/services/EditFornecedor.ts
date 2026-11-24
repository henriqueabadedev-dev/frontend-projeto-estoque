import axios from "axios";

export async function EditFornecedortRoutePost<T>(id: string, data: any) {
  const response = await axios.put<T>(
    ` http://localhost:3000/homepage/editFornecedor/${id}`,
    data
  );
  return response;
}

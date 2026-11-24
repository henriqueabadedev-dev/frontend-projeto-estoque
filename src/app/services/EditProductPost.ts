import axios from "axios";

export async function EditProductRoutePost<T>(id: string, data: any) {
  const response = await axios.put<T>(
    ` https://backend-projeto-estoque.onrender.com/homepage/editProoduct/${id}`,
    data
  );
  return response;
}

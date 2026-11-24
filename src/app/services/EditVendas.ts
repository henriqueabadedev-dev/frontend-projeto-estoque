import axios from "axios";

export async function EditVendas<T>(id: string, data: any) {
  const response = await axios.put<T>(
    ` https://backend-projeto-estoque.onrender.com/homepage/EditVendas/${id}`,
    data
  );
  return response;
}

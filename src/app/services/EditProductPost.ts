import axios from "axios";

export async function EditProductRoutePost<T>(id: string, data: any) {
  const response = await axios.put<T>(
    ` http://localhost:3000/homepage/editProoduct/${id}`,
    data
  );
  return response;
}

import axios from "axios";

export async function EditClientRoutePost<T>(id: string, data: any) {
  const response = await axios.put<T>(
    ` http://localhost:3000/homepage/editClient/${id}`,
    data
  );
  return response;
}

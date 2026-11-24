import axios from "axios";

export async function EditVendas<T>(id: string, data: any) {
  const response = await axios.put<T>(
    ` http://localhost:3000/homepage/EditVendas/${id}`,
    data
  );
  return response;
}

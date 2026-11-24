import axios from "axios";

export async function EditProductRoute<T>(id: string) {
  const response = await axios.get<T>(
    ` http://localhost:3000/homepage/editProoductId/${id}`
  );
  return response;
}

import axios from "axios";

export async function EditProductRoute<T>(id: string) {
  const response = await axios.get<T>(
    ` https://backend-projeto-estoque.onrender.com/homepage/editProoductId/${id}`
  );
  return response;
}

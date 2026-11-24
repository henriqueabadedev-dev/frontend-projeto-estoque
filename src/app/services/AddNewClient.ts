import axios from "axios";

export async function AddClientService(data: any) {
  const response = await axios.post(
    ` https://backend-projeto-estoque.onrender.com/homepage/AddClient`,
    data
  );
  return response;
}

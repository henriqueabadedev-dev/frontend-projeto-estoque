import axios from "axios";

export async function AddClientService(data: any) {
  const response = await axios.post(
    ` http://localhost:3000/homepage/AddClient`,
    data
  );
  return response;
}

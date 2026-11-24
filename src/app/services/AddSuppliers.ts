import axios from "axios";

export async function AddSuplierService(data: any) {
  const response = await axios.post(
    " https://backend-projeto-estoque.onrender.com/homepage/addFornecedor",
    data
  );
  return response;
}

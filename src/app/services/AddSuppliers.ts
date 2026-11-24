import axios from "axios";

export async function AddSuplierService(data: any) {
  const response = await axios.post(
    " http://localhost:3000/homepage/addFornecedor",
    data
  );
  return response;
}

import axios from "axios";

export async function AddVendaService(data: any) {
  const response = await axios.post(
    " https://backend-projeto-estoque.onrender.com/homepage/AddNewVenda",
    data
  );
  return response;
}

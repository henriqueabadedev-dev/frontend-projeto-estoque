import axios from "axios";

export async function AddVendaService(data: any) {
  const response = await axios.post(
    " http://localhost:3000/homepage/AddNewVenda",
    data
  );
  return response;
}

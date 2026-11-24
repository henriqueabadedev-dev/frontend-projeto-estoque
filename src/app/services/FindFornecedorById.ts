import axios from "axios";

export async function GetFornecedorBtId<T>(id: string) {
  const response = await axios.get<T>(
    ` http://localhost:3000/homepage/findFornecedorById/${id}`
  );
  return response;
}

import axios from "axios";

export async function GetFornecedorBtId<T>(id: string) {
  const response = await axios.get<T>(
    ` https://backend-projeto-estoque.onrender.com/homepage/findFornecedorById/${id}`
  );
  return response;
}

import axios from "axios";

export async function FilterFornecedorService<T>(busca: string) {
  const response = await axios.get<T>(
    ` https://backend-projeto-estoque.onrender.com/homepage/filterFornecedor`,
    {
      params: {
        search: busca,
      },
    }
  );
  return response;
}

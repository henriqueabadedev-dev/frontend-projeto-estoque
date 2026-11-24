import axios from "axios";

export async function FilterFornecedorService<T>(busca: string) {
  const response = await axios.get<T>(
    ` http://localhost:3000/homepage/filterFornecedor`,
    {
      params: {
        search: busca,
      },
    }
  );
  return response;
}

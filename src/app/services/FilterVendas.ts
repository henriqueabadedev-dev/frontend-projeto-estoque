import axios from "axios";

export async function FilterVendas<T>(
  value: string,
  busca: string,
  page: number,
  limit: number
) {
  const response = await axios.get<T>(
    ` https://backend-projeto-estoque.onrender.com/homepage/filterVendas/${value}/${page}/${limit}`,
    {
      params: {
        search: busca,
      },
    }
  );
  return response;
}

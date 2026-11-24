import axios from "axios";

export async function GetAllClient<T>(
  page: number,
  limit: number,
  filtro: string,
  busca: string
) {
  const response = await axios.get<T>(
    ` https://backend-projeto-estoque.onrender.com/homepage/findClient/${page}/${limit}/${filtro}`,
    {
      params: {
        search: busca,
      },
    }
  );
  return response;
}

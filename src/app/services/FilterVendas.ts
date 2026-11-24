import axios from "axios";

export async function FilterVendas<T>(
  value: string,
  busca: string,
  page: number,
  limit: number
) {
  const response = await axios.get<T>(
    ` http://localhost:3000/homepage/filterVendas/${value}/${page}/${limit}`,
    {
      params: {
        search: busca,
      },
    }
  );
  return response;
}

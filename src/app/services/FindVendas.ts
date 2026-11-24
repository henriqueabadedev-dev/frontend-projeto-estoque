import axios from "axios";

export async function GetAllVendas<T>(
  page: number,
  limit: number,
  query: string
) {
  const response = await axios.get<T>(
    ` http://localhost:3000/homepage/findVendas/${page}/${limit}`,
    {
      params: {
        search: query,
      },
    }
  );
  return response;
}

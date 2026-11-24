import axios from "axios";

export async function GetAllProducts<T>(
  page: number,
  limit: number,
  filter: string,
  valuesearch: string
) {
  const response = await axios.get<T>(
    ` http://localhost:3000/homepage/allProducts/${page}/${limit}`,
    {
      params: {
        filtro: filter,
        search: valuesearch,
      },
    }
  );
  return response;
}

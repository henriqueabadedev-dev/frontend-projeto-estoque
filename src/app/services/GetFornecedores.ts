import axios from "axios";

export async function GetAllFornecedores<T>(
  page: number,
  limit: number,
  search: string
) {
  console.log(search);
  const response = await axios.get<T>(
    ` https://backend-projeto-estoque.onrender.com/homepage/GetFornecedor/${page}/${limit}`,
    {
      params: {
        search: search,
      },
    }
  );
  return response;
}

import axios from "axios";

export async function ObterDadosCard<T>(dataInicio: string, dataFim: string) {
  const response = await axios.get<T>(
    `  https://backend-projeto-estoque.onrender.com/homepage/DadosCard?dataInicio=${dataInicio}&dataFim=${dataFim}`
  );
  return response.data;
}
import axios from "axios";

export async function ObterDadosCard<T>(dataInicio: string, dataFim: string) {
  const response = await axios.get<T>(
    `  http://localhost:3000/homepage/DadosCard?dataInicio=${dataInicio}&dataFim=${dataFim}`
  );
  return response.data;
}
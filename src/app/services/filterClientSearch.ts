import axios from "axios";

export async function FilterClientSearch<T>(busca: string) {
  if (busca) {
    const response = await axios.get<T>(
      ` http://localhost:3000/homepage/filterCliente`,
      {
        params: {
          search: busca,
        },
      }
    );
    return response;
  } else {
    return;
  }
}

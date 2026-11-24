import axios from "axios";
import { GetAllProducts } from "./GetAllProducts";

export async function AddProductService(data: any) {
  const response = await axios.post(
    ` https://backend-projeto-estoque.onrender.com/homepage/addProduct`,
    data
  );
  return response;
}

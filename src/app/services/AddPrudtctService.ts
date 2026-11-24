import axios from "axios";
import { GetAllProducts } from "./GetAllProducts";

export async function AddProductService(data: any) {
  const response = await axios.post(
    ` http://localhost:3000/homepage/addProduct`,
    data
  );
  return response;
}

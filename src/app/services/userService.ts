import axios from "axios";

export async function registerUser(data: any) {
  const response = await axios.post(
    " https://backend-projeto-estoque.onrender.com/register",
    data,
    {
      withCredentials: true,
    }
  );
  return response;
}

export async function loginUser(data: any) {
  const response = await axios.post(
    " https://backend-projeto-estoque.onrender.com/login",
    data,
    {
      withCredentials: true,
    }
  );
  return response;
}

export async function AuthUser() {
  const response = await axios.post(
    " https://backend-projeto-estoque.onrender.com/login/auth",
    {},
    {
      withCredentials: true,
    }
  );

  return response;
}

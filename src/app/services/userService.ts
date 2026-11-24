import axios from "axios";

export async function registerUser(data: any) {
  const response = await axios.post(
    " http://localhost:3000/register",
    data,
    {
      withCredentials: true,
    }
  );
  return response;
}

export async function loginUser(data: any) {
  const response = await axios.post(
    " http://localhost:3000/login",
    data,
    {
      withCredentials: true,
    }
  );
  return response;
}

export async function AuthUser() {
  const response = await axios.post(
    " http://localhost:3000/login/auth",
    {},
    {
      withCredentials: true,
    }
  );

  return response;
}

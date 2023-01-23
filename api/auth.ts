import axios from "axios";
import { AuthParams } from "../types/auth";
export const loginApi = async ({ email, password }: AuthParams) => {
  const { data } = await axios.post("http://localhost:8080/users/login", {
    email: email,
    password: password,
  });
  return data;
};
export const signUpApi = async ({ email, password }: AuthParams) => {
  const { data } = await axios.post("http://localhost:8080/users/create", {
    email: email,
    password: password,
  });
  return data;
};

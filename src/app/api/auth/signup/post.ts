import { User } from "../../../entities/User";
import { httpClient } from "../../../services/httpClient";

export interface FetchSignUpBody {
  name: string;
  email: string;
  password: string;
}

export async function fetchSignUp(body: FetchSignUpBody) {
  const { data } = await httpClient.post<User>("/auth/signup", body);

  return data;
}

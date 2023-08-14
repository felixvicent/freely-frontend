import { User } from "../../../entities/User";
import { httpClient } from "../../../services/httpClient";

export interface FetchSignInBody {
  email: string;
  password: string;
}

export async function fetchSignIn(body: FetchSignInBody) {
  const { data } = await httpClient.post<User>("/auth/signin", body);

  return data;
}

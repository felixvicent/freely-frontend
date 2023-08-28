import { Token } from "../../../entities/Token";
import { User } from "../../../entities/User";
import { httpClient } from "../../../services/httpClient";

export interface FetchSignInBody {
  email: string;
  password: string;
}

export interface FetchSignInResponse {
  token: Token;
  user: User;
}

export async function fetchSignIn(body: FetchSignInBody) {
  const { data } = await httpClient.post<FetchSignInResponse>(
    "/auth/signin",
    body
  );

  return data;
}

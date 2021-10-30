import axios from "axios";

export interface UserCredentials {
  username: string;
  password: string;
  instance?: string;
}

export interface User {
  //
}

export async function loginUser(credentials: UserCredentials): Promise<User> {
  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
    ...credentials,
    instance: 'aphlab.mygo1.com',
  });
  return data;
}

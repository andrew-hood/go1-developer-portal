import axios from "axios";

export interface UserCredentials {
  username: string;
  password: string;
}

export interface AuthToken {
  access_token: string;
  refresh_token: string;
}

export interface ClientApp {
  client_id: string;
  client_name: string;
  client_secret: string;
  created: Date;
  portal_id: number
  portal_name: string;
  redirect_uri: string;
  status: number;
}

export async function postLogin(credentials: UserCredentials): Promise<AuthToken> {
  try {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/oauth/token`, {
      scope: 'app.read app.write',
      client_id: process.env.CLIENT_ID,
      grant_type: 'password',
      username: credentials.username,
      password: credentials.password,
    });
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getAuthClients(token: string, portalName?: string): Promise<ClientApp[]> {
  const url = `${process.env.NEXT_PUBLIC_AUTH_API_URL}/client?limit=50&offset=0${portalName ? `&portal_name=${portalName}` : ''}`;
  const headers = { Authorization: `Bearer ${token}` };
  
  try {
    const { data } = await axios.get(url, { headers });
    return data;
  } catch (err) {
    return null;
  }
}

export async function createAuthClient(token: string, body: any): Promise<ClientApp> {
  const url = `${process.env.NEXT_PUBLIC_AUTH_API_URL}/client`;
  const headers = { Authorization: `Bearer ${token}` };
  
  try {
    const { data } = await axios.post(url, body, { headers });
    return data;
  } catch (err) {
    return null;
  }
}

export async function updateAuthClient(token: string, id: string, body: any): Promise<ClientApp> {
  const url = `${process.env.NEXT_PUBLIC_AUTH_API_URL}/client/${id}`;
  const headers = { Authorization: `Bearer ${token}` };
  
  try {
    const { data } = await axios.put(url, body, { headers });
    return data;
  } catch (err) {
    return null;
  }
}

export async function regenerateAuthClientSecret(token: string, id: string): Promise<string> {
  const url = `${process.env.NEXT_PUBLIC_AUTH_API_URL}/client/${id}/regenerate-secret`;
  const headers = { Authorization: `Bearer ${token}` };
  
  try {
    const { data: { secret } } = await axios.post(url, {}, { headers });
    return secret;
  } catch (err) {
    return null;
  }
}

export async function deleteAuthClient(token: string, id: string): Promise<string> {
  const url = `${process.env.NEXT_PUBLIC_AUTH_API_URL}/client/${id}`;
  const headers = { Authorization: `Bearer ${token}` };
  
  try {
    const { data } = await axios.delete(url, { headers });
    return data;
  } catch (err) {
    return null;
  }
}

export async function getClientAccessToken({ client_id, client_secret }: ClientApp): Promise<AuthToken> {
  const url = `${process.env.NEXT_PUBLIC_AUTH_API_URL}/oauth/token`;
  const body = {
    client_id,
    client_secret,
    grant_type: 'client_credentials'
  }
  
  try {
    const { data } = await axios.post(url, body);
    return data;
  } catch (err) {
    return null;
  }
}
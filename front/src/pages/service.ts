import axios from "axios";


export async function logs(): Promise<any> {
  return axios.get('/api/logs').then((res) => res.data.logs);
}
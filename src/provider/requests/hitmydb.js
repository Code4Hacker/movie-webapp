import axios from "axios";
import { mr_db } from "../baseURLs";
export const server_provider = async ({path, method, body}) => {
  let request = await axios.request({
    url: `${mr_db}${path}`,
    method: method,
    data:body
  });
  return request;
}
import axios from "axios";
import { accessToken, baseUrl } from "../baseURLs";
export const fetchAllMovie = async (path) => {
  let request = await axios.request({
    url: `${baseUrl}${path}`,
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  });
  return request;
}
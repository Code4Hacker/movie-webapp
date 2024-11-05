import axios from "axios";
import { accessKey, accessToken, baseUrl } from "./baseURLs";

const options = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  };
export const fetchAllMovie = async(path) => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      };
      
      let request = await axios.request({
        url:`${baseUrl}${path}`,
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      });
      return request;
  }
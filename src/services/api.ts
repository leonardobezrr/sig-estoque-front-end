import axios from "axios";
import { parseCookies, destroyCookie } from "nookies";

let cookies = parseCookies();

export const api = axios.create({
  baseURL: "http://localhost:3333/",
  headers: {
    Authorization: `Bearer ${cookies["ssAuth.token"]}`,
  },
});

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response) {
//       if (error.response.status === 401) {
//         destroyCookie(null, "ssAuth.token");
//         window.location.href = "/";
//         return;
//       }
//     }

//     console.log(error);
//     return Promise.reject(error);
//   }
// );
import axios from 'axios';
import {parseCookies} from "nookies";

// const { 'whydo-token': token } = parseCookies()
export const api = axios.create({
  baseURL: 'https://inlive.ga/',
});
// console.log(token)
// if (true) {
//   api.defaults.headers['Authorization'] = `Bearer ${token}`
// }

import axios from "axios";

const request = axios.create({
  baseURL: "https://6525188267cfb1e59ce696a1.mockapi.io/",
  timeout: 10000,
});

export default request;

import axios from "axios";

const postCodeSearch = axios.create({
  baseURL: import.meta.env.VITE_GEOAPIFY_API_URL,
  timeout: 10000,
});

export default postCodeSearch;

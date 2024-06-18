import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1/api/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

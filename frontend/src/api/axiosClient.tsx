import axios from "axios";

const AxiosClient = axios.create({
  baseURL:
    window.location.host === "localhost:8080"
      ? ""
      : process.env.REACT_APP_BACKEND_URL || "http://localhost:8000",
  headers: { "Content-Type": "application/json" },
});

export default AxiosClient;

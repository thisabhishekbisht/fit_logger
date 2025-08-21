

import axios from "axios";

export const http = axios.create({
  baseURL: "https://wger.de/api/v2", // API base
});
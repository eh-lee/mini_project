import axios from "axios";

export const fetchCsrfToken = async () => {
    const response = await axios.get("/api/csrf-token");
    const csrfToken = response.data.csrfToken;
    return csrfToken;
};
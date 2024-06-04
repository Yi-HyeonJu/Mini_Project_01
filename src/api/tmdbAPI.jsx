import axios from "axios";

const tmdbKey = import.meta.env.VITE_TMDB_KEY;

const tmdbAPI = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: tmdbKey,
        language: "ko-KR"
    }
})

export default tmdbAPI
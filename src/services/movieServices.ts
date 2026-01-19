import axios from 'axios';
import type Movie from '../types/movie';
import { myKey } from '../components/Axios/axios';
import { BASE_URL } from '../components/Axios/axios';

interface MoviesHttpResponse {
    results: Movie[];
    total_results: number;
    total_pages: number;
    page: number;
}

const fetchMovies = async (query: string = '') => {
    try {
        const response = await axios.get<MoviesHttpResponse>(BASE_URL, {
            params: {
                query: query,
                include_adult: false,
               language: 'en-US',
                page: 1,
            },
            headers: {
                Authorization: `Bearer ${myKey}`,
            },
        });
        

        return response.data.results;
    } catch (error) {
        console.error('Помилка при завантаженні фільмів:', error);
      
    };
}
export default fetchMovies
import axios from 'axios';
import type Movie from '../types/movie';
import { myKey } from '../components/Axios/axios';
import { BASE_URL } from '../components/Axios/axios';
import toast from 'react-hot-toast';
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
                accept: 'application/json',
            },
        });
        

        return response.data.results;
    } catch {

        toast.error("No movies found for your request.", {
            position: 'top-right',
          })
      
    };
}
export default fetchMovies
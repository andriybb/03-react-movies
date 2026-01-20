
export const myKey: string = import.meta.env.VITE_TMDB_TOKEN;
if (!myKey) {
    throw new Error('VITE_TMDB_TOKEN is not defined in environment variables');
  }

export const BASE_URL: string = 'https://api.themoviedb.org/3/search/movie';


export const IMAGE_URL: string = 'https://image.tmdb.org/t/p';
export const getImageUrl = (path: string, size: string = 'w500'): string => {
    return `${IMAGE_URL}/${size}${path}`;
  };
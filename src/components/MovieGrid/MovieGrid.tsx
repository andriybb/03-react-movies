import css from './MovieGrid.module.css';
import type Movie from '../../types/movie';
import { BASE_URL } from '../Axios/axios';

interface MovieGridProps {
  onSelect: (movie: Movie) => void;
  movies: Movie[]; 
}

function MovieGrid({ movies, onSelect }: MovieGridProps) {


  return (
    <ul className={css.grid}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.item} onClick={() => onSelect(movie)}>
          <div className={css.card}>
            <img
              className={css.image}
              src={movie.poster_path =`${BASE_URL}${movie.poster_path}` 
                 
              }
              alt={movie.title}
              loading="lazy"
            />
            <div className={css.info}>
              <h2 className={css.title}>{movie.title}</h2>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MovieGrid;
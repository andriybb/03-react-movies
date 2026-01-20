import css from './MovieGrid.module.css';
import type Movie from '../../types/movie';
import { IMAGE_URL } from '../Axios/axios'; // використовуємо утилітарну функцію

interface MovieGridProps {
  onSelect: (movie: Movie) => void;
  movies: Movie[]; 
}

function MovieGrid({ movies, onSelect }: MovieGridProps) {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "https://via.placeholder.com/500x750?text=No+Poster";
  };

  const handleKeyDown = (e: React.KeyboardEvent, movie: Movie) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(movie);
    }
  };

  return (
    <ul className={css.grid}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.item}>
          <div 
            className={css.card}
            onClick={() => onSelect(movie)}
            onKeyDown={(e) => handleKeyDown(e, movie)}
            role="button"
            tabIndex={0}
            aria-label={`View details for ${movie.title || 'Unknown movie'}`}
          >
            <img
              className={css.image}
              src={`${IMAGE_URL}${movie.poster_path}`}
              alt={movie.title ? `${movie.title} poster` : 'Movie poster'}
              loading="lazy"
              onError={handleImageError}
            />
            <div className={css.info}>
              <h2 className={css.title}>{movie.title || 'Unknown Title'}</h2>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MovieGrid;
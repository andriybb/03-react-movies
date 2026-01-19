import { useEffect } from 'react';
import type Movie from '../../types/movie';
import css from './MovieModal.module.css';
import { BASE_URL } from '../Axios/axios';
interface MovieModalProps {
  onClose: () => void;
  movie: Movie;
}

function MovieModal({ movie, onClose }: MovieModalProps) {



  // Додаємо обробку клавіші Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Вішаємо слухач при монтуванні
    window.addEventListener('keydown', handleKeyDown);
    
    // Блокуємо прокрутку сторінки під модалкою
    document.body.style.overflow = 'hidden';

    // Очищення при розмонтуванні
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  return (
    <div className={css.backdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button 
          className={css.closeButton} 
          onClick={onClose} 
          aria-label="Close modal"
        >
          &times;
        </button>
        
        <img
                  src={movie.backdrop_path = `${BASE_URL}${movie.backdrop_path}`}
          alt={movie.title}
          className={css.image}
        />
        
        <div className={css.content}>
          <h2 className={css.title}>{movie.title}</h2>
          <p className={css.overview}>{movie.overview}</p>
          
          <div className={css.details}>
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p><strong>Rating:</strong> {movie.vote_average?.toFixed(1)}/10</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
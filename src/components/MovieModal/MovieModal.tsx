import { useEffect, useRef } from 'react';
import type Movie from '../../types/movie';
import { getImageUrl } from '../Axios/axios';
import css from './MovieModal.module.css';

interface MovieModalProps {
  onClose: () => void;
  movie: Movie;
}

function MovieModal({ movie, onClose }: MovieModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Зберігаємо попередній активний елемент
    const previousActiveElement = document.activeElement as HTMLElement;

    // Фокусуємо кнопку закриття
    closeButtonRef.current?.focus();

    // Блокуємо скрол
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      
      // Повертаємо фокус на попередній елемент
      previousActiveElement?.focus();
    };
  }, [onClose]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "https://via.placeholder.com/1280x720?text=No+Image";
  };

  const formatDate = (date: string | undefined): string => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatRating = (rating: number | undefined): string => {
    if (rating === undefined || rating === null) return 'N/A';
    return `${rating.toFixed(1)}/10`;
  };

  return (
    <div 
      className={css.backdrop} 
      onClick={onClose}
      role="dialog" 
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className={css.modal} 
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        <button 
          ref={closeButtonRef}
          className={css.closeButton} 
          onClick={onClose} 
          aria-label="Close modal"
          type="button"
        >
          &times;
        </button>
       
        <img
          src={movie.backdrop_path 
            ? getImageUrl(movie.backdrop_path, 'original')
            : "https://via.placeholder.com/1280x720?text=No+Image"
          }
          alt={movie.title ? `${movie.title} backdrop` : 'Movie backdrop'}
          className={css.image}
          onError={handleImageError}
        />
        
        <div className={css.content}>
          <h2 id="modal-title" className={css.title}>
            {movie.title || 'Unknown Title'}
          </h2>
          <p className={css.overview}>
            {movie.overview || 'No overview available.'}
          </p>
          
          <div className={css.details}>
            <p>
              <strong>Release Date:</strong> {formatDate(movie.release_date)}
            </p>
            <p>
              <strong>Rating:</strong> {formatRating(movie.vote_average)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
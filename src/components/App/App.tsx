import { useState } from 'react';
import { useCallback } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import fetchMovies from '../../services/movieServices';
import type Movie from '../../types/movie';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false); 
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
  
    try {
      setIsLoading(true);
      setError(false); 
      setMovies([]); 
  
      const data = await fetchMovies(query); 
  

      if (data && data.results.length === 0) {
        toast.error("No movies found for your request.", {
          position: 'top-right',
        });
        return;
      }
  
      
      if (data && data.results) {
        setMovies(data.results);
      }
      
    } catch { 
      setError(true);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  
  const openModal = (movie: Movie) => setSelectedMovie(movie);
  const closeModal = useCallback(() => setSelectedMovie(null), []);

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />

      {error && <ErrorMessage />}
      {isLoading && <Loader />}

      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={openModal} />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </>
  );
}

export default App;
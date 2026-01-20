import { useRef } from 'react';
import toast from 'react-hot-toast';
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (value: string) => void;
}

function SearchBar({ onSubmit }: SearchBarProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleFormAction = (formData: FormData) => {
    const query = formData.get("query") as string;

    if (!query || query.trim().length < 2) {
      toast.error("Please enter at least 2 characters to search.");
      return;
    }

    onSubmit(query.trim());

    formRef.current?.reset();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>


        <form 
          ref={formRef}
          className={styles.form} 
          action={handleFormAction}
        >
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            aria-label="Search movies"
            autoFocus
          />
          <button 
            className={styles.button} 
            type="submit"
            aria-label="Submit search"
          >
            Search
          </button>
        </form>
      </div>
    </header>
  );
}

export default SearchBar;
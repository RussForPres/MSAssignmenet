
import { useEffect, useState } from 'react';
import MovieGrid from '../components/MovieGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { getPopularMovies } from '../services/movieService';

function Home({ searchResults }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchMovies() {
      try {
        const data = await getPopularMovies();
        setMovies(data.results);
      } catch (err) {
        setError('Could not load movies. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  const isSearching = searchResults !== null;
  const displayedMovies = searchResults ?? movies;

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>{isSearching ? 'Search Results' : 'Popular Movies'}</h2>
        <p>
          {isSearching
            ? 'Movies matching your search'
            : 'Discover and save your favorite films'}
        </p>
      </div>

      {loading && !isSearching && <LoadingSpinner />}
      {error && !isSearching && <ErrorMessage message={error} />}

      {(!loading || isSearching) && (!error || isSearching) && (
        displayedMovies.length > 0 ? (
          <MovieGrid movies={displayedMovies} />
        ) : (
          <p>No movies found.</p>
        )
      )}
    </main>
  );
}

export default Home;

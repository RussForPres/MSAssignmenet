
import { useEffect, useState } from 'react';
import MovieGrid from '../components/MovieGrid';

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    function loadFavorites() {
      const savedFavorites =
        JSON.parse(localStorage.getItem('favorites')) || [];

      setFavorites(savedFavorites);
    }

    loadFavorites();

    window.addEventListener('storage', loadFavorites);

    return () => {
      window.removeEventListener('storage', loadFavorites);
    };
  }, []);

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>My Favorite Movies</h2>
        <p>Your saved movies</p>
      </div>

      {favorites.length > 0 ? (
        <MovieGrid movies={favorites} />
      ) : (
        <p>You haven't added any favorites yet.</p>
      )}
    </main>
  );
}

export default Favorites;

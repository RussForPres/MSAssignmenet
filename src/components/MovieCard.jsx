
import { useState } from 'react';

function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.some((fav) => fav.id === movie.id);
  });

  function toggleFavorite() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (isFavorite) {
      const updatedFavorites = favorites.filter(
        (fav) => fav.id !== movie.id
      );
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      favorites.push(movie);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : 'https://placehold.co/300x450/667eea/ffffff?text=No+Poster'
          }
          alt={movie.title}
        />
      </div>

      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-details">
          <span className="movie-rating">
            ⭐ {movie.vote_average}
          </span>
          <span className="movie-year">
            {movie.release_date?.substring(0, 4) || 'N/A'}
          </span>
        </div>

        <button className="favorite-button" onClick={toggleFavorite}>
          {isFavorite ? '♥ Remove Favorite' : '♡ Add to Favorites'}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;

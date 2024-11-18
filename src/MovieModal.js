import React from 'react';
import './MovieModal.css'; 

const MovieModal = ({ movie, closeModal }) => {
  if (!movie) return null; 

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={closeModal}>
          &times;
        </button>
        <h2>{movie.title}</h2>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="modal-image"
        />
        <p><strong>Overview:</strong> {movie.overview}</p>
        <p><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
        <p><strong>Rating:</strong> {movie.vote_average} / 10</p>
        <p><strong>Release Date:</strong> {movie.release_date}</p>
      </div>
    </div>
  );
};

export default MovieModal;


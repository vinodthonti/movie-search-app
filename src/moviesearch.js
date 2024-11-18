import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const apiKey = '9c3dd33e5e918001936aa28d98c8da2b';
  const apiUrl = 'https://api.themoviedb.org/3/search/movie';
  const popularMoviesUrl = 'https://api.themoviedb.org/3/movie/popular'; 
  const movieDetailsUrl = 'https://api.themoviedb.org/3/movie/';

  
  useEffect(() => {
    const fetchPopularMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(popularMoviesUrl, {
          params: {
            api_key: apiKey,
            page: 1,
          },
        });
        setMovies(response.data.results); 
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, []); 

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!query) return;

    setLoading(true);
    try {
      const response = await axios.get(apiUrl, {
        params: {
          api_key: apiKey,
          query: query,
          page: 1,
        },
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  
  const handleMovieClick = async (movieId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${movieDetailsUrl}${movieId}`, {
        params: {
          api_key: apiKey,
        },
      });
      setSelectedMovie(response.data);
      setModalOpen(true);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    } finally {
      setLoading(false);
    }
  };

  
  const closeModal = () => {
    setModalOpen(false);
    setSelectedMovie(null); 
  };

  return (
    <div>
      <h1>Movie Search App</h1>

      
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className='srch-botton' type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {loading && <p>Loading...</p>}

      
      <div className="movie-results">
        {movies.length === 0 && !loading && <p>No movies found.</p>}
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-card"
            onClick={() => handleMovieClick(movie.id)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>

      
      {modalOpen && selectedMovie && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>X</button>
            <h2>{selectedMovie.title}</h2>
            <img
              src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
              alt={selectedMovie.title}
            />
            <p><strong>Overview:</strong> {selectedMovie.overview}</p>
            <p><strong>Genres:</strong> {selectedMovie.genres.map(genre => genre.name).join(', ')}</p>
            <p><strong>Rating:</strong> {selectedMovie.vote_average} / 10</p>
            <p><strong>Release Date:</strong> {selectedMovie.release_date}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieSearch;

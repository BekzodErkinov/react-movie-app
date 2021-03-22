import { useState, useEffect } from 'react'
// Library
import axios from 'axios'

// Data
import notToShow from '../../assets/data/NotToShow'
// Components
import MovieCard from '../../components/MovieCard/MovieCard'
import Loader from '../../components/Animation/Loader'

// SCSS
import './Movies.scss'

const Movies = ({ match }) => {
  const [moviesList, setMoviesList] = useState({
    isFetched: false,
    data: [],
    error: null,
  })

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/now_playing`, {
        params: {
          api_key: "408c4caa837834514ec8de6e5f7b12df",
        },
      })
      .then((res) => {
        console.log(res.data)
        setMoviesList({
          isFetched: true,
          data: res.data.results,
          error: false,
        })
      })
      .catch((err) => {
        setMoviesList({
          isFetched: true,
          data: [],
          error: err,
        })
      })
  }, [])

  return (
    <div className="now-playing-movies-holder">
      <div className="container">
        <h1 className="now-playing-title">Top Rated Movies</h1>
        {moviesList.isFetched ? (
          <div className="now-playing-wrap">
            {moviesList.data.map(movie => (
              !notToShow.includes(movie.id) ? (
                <MovieCard
                  movie_id={movie.id}
                  title={movie.title}
                  imgLink={movie.poster_path}
                  rating={movie.vote_average}
                  releaseDate={movie.release_date}
                  key={movie.id}
                />
              ) : (null)
            ))}
          </div>
        ) : (
          <div className="loading">
            <Loader />
          </div>
        )}
      </div>
    </div>
  )
}

export default Movies

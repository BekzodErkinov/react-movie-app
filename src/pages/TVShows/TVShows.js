import { useState, useEffect } from 'react'
// Library
import axios from 'axios'

// Data
import notToShow from '../../assets/data/NotToShow'
// Components
import MovieCard from '../../components/MovieCard/MovieCard'
// Animation
import Loader from '../../components/Animation/Loader'

// SCSS
import './TVShows.scss'

const TVShows = () => {
  const [tvShows, setTvShows] = useState({
    isFetched: false,
    data: [],
    error: null,
  })

  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/tv/popular?", {
        params: {
          api_key: "408c4caa837834514ec8de6e5f7b12df",
        },
      })
      .then((res) => {
        setTvShows({
          isFetched: true,
          data: res.data.results,
          error: false,
        })
      })
      .catch((err) => {
        setTvShows({
          isFetched: true,
          data: [],
          error: err,
        })
      })
  }, [])

  return (
    <div className="tvshows-holder">
      <div className="container">
        {tvShows.isFetched ? (
          <div className="tvshows-wrap">
            {tvShows.data.map(movie => (
              !notToShow.includes(movie.id) ? (
                <MovieCard
                  movie_id={movie.id}
                  title={movie.name}
                  imgLink={movie.poster_path}
                  rating={movie.vote_average}
                  releaseDate={movie.first_air_date}
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

export default TVShows

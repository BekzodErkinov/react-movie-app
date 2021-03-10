import { useState, useEffect } from 'react'
import axios from 'axios'

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

  console.log(tvShows);

  return (
    <div>
      {tvShows.isFetched ? (
        <div className="tvshows-holder">
          {tvShows.data.map((movie, index) => (
            <MovieCard
              movie_id={movie.id}
              title={movie.name}
              imgLink={movie.poster_path}
              rating={movie.vote_average}
              releaseDate={movie.first_air_date}
              key={index}
            />
          ))}
        </div>
      ) : (
        <div className="loading">{Loader}</div>
      )}
    </div>
  )
}

export default TVShows

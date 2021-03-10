import { useState, useEffect } from "react"
import axios from "axios"

// Components
import MovieCard from "../../components/MovieCard/MovieCard"
// Animation
import Loader from '../../components/Animation/Loader'

// SCSS
import "./Popular.scss"

const Popular = () => {
  const [moviesList, setMoviesList] = useState({
    isFetched: false,
    data: [],
    error: null,
  })

  // Getting Popural movies
  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/movie/popular?page=1", {
        params: {
          api_key: "408c4caa837834514ec8de6e5f7b12df",
        },
      })
      .then((res) => {
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
    <div>
      {moviesList.isFetched ? (
        <div className="movies-holder">
          {moviesList.data.map((movie, index) => (
            <MovieCard
              title={movie.title}
              movie_id={movie.id}
              imgLink={movie.poster_path}
              rating={movie.vote_average}
              releaseDate={movie.release_date}
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

export default Popular

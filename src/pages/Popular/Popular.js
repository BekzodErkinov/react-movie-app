import { useState, useEffect } from "react"
// Library
import axios from "axios"

// Data
import notToShow from '../../assets/data/NotToShow'
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
      .get("https://api.themoviedb.org/3/movie/popular?page=2", {
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
    <div className="popular-movies-holder">
      <div className="container">
        {moviesList.isFetched ? (
          <div className="popular-movies-wrap">
            {moviesList.data.map(movie => (
              !notToShow.includes(movie.id) ? (
                <MovieCard
                  title={movie.title}
                  movie_id={movie.id}
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

export default Popular

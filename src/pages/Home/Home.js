import { useState, useEffect } from 'react'
// Library
import axios from 'axios'

// Data
import notToShow from '../../assets/data/NotToShow'
// Component
import MovieCard from '../../components/MovieCard/MovieCard'
// Animation
import Loader from '../../components/Animation/Loader'

// SCSS
import './Home.scss'

const Home = () => {
  const [topRatedMovies, setTopRatedMovies] = useState({
    isFetched: false,
    data: [],
    error: null,
  })

  // Getting Top Rated movies
  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/movie/top_rated?", {
        params: {
          api_key: "408c4caa837834514ec8de6e5f7b12df",
        },
      })
      .then((res) => {
        setTopRatedMovies({
          isFetched: true,
          data: res.data.results,
          error: false,
        })
      })
      .catch((err) => {
        setTopRatedMovies({
          isFetched: true,
          data: [],
          error: err,
        })
      })
  }, [])

  // console.log(topRatedMovies)

  return (
    <div className="top-rated-movie-holder">
      <div className="container">
        <h1 className="top-rated-title">Top Rated Movies</h1>
        {topRatedMovies.isFetched ? (
          <div className="top-rated-wrap">
            {topRatedMovies.data.map(movie => (
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

export default Home

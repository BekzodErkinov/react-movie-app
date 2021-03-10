import { useState, useEffect } from 'react'
import axios from 'axios'

// ? List of Movies Not to Show
// import notToShow from '../../assets/NotToShow'

// Component
import MovieCard from '../../components/MovieCard/MovieCard'
// Animation
import Loader from './../../components/Animation/Loader'

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

  return (
    <div>
      {topRatedMovies.isFetched ? (
        <div className="top-rated-movie-holder">
          {topRatedMovies.data.map((movie, index) => (
            <MovieCard
              movie_id={movie.id}
              title={movie.title}
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

export default Home

/* Not To Show
            topRatedMovies.data.map((movie, index) => {
              notToShowMovieId !== movie.id ? (
                <TopRatedMovieCard
                  movie_id={movie.id}
                  title={movie.title}
                  imgLink={movie.poster_path}
                  rating={movie.vote_average}
                  releaseDate={movie.release_date}
                  key={index}
                />
              ) : (<h1>NOT TO SHOW! ⛔️</h1>)
            })
*/
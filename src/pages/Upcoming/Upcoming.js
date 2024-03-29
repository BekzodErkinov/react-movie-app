import { useState, useEffect } from 'react'
// Library
import axios from 'axios'

// Components
import MovieCard from "../../components/MovieCard/MovieCard"
// Animation
import Loader from '../../components/Animation/Loader'

// SCSS
import './Upcoming.scss'

const Upcoming = () => {
  const [upcomingMovies, setUpcomingMovies] = useState({
    isFetched: false,
    data: [],
    error: null,
  })

  // Getting Top Rated movies
  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/movie/upcoming?", {
        params: {
          api_key: "408c4caa837834514ec8de6e5f7b12df",
        },
      })
      .then((res) => {
        setUpcomingMovies({
          isFetched: true,
          data: res.data.results,
          error: false,
        })
      })
      .catch((err) => {
        setUpcomingMovies({
          isFetched: true,
          data: [],
          error: err,
        })
      })
  }, [])

  return (
    <div className="upcoming-movies-holder">
      <div className="container">
        {upcomingMovies.isFetched ? (
          <div className="upcoming-movies-wrap">
            {upcomingMovies.data.map(movie => (
              <MovieCard
                title={movie.title}
                movie_id={movie.id}
                imgLink={movie.poster_path}
                rating={movie.vote_average}
                releaseDate={movie.release_date}
                key={movie.id}
              />
            ))}
          </div>
        ) : (
          <div className="loading">
            <Loader/>
          </div>
        )}
      </div>
    </div>
  )
}

export default Upcoming

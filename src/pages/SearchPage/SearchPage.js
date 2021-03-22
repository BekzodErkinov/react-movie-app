import { useState, useEffect } from 'react'
// Library
import axios from 'axios'

// Data
import notToShow from '../../assets/data/NotToShow'
// Components
import MovieCard from '../../components/MovieCard/MovieCard'
import Loader from '../../components/Animation/Loader'

// SCSS
import './SearchPage.scss'

const SearchPage = ({ match }) => {
  const [moviesList, setMoviesList] = useState({
    isFetched: false,
    data: [],
    error: null,
  })

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: "408c4caa837834514ec8de6e5f7b12df",
          query: match.params.searchText,
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
  }, [match.params.searchText])

  // console.log(moviesList)

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

export default SearchPage

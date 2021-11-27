import { useState, useEffect } from "react"
// Library
import axios from "axios"
import { useHistory } from 'react-router-dom'

// Data
import notToShow from '../../assets/data/NotToShow'
// Components
import MovieCard from "../../components/MovieCard/MovieCard"
import Pagination from '../../components/Pagination/Pagination'
// Animation
import Loader from '../../components/Animation/Loader'

// SCSS
import "./Popular.scss"

const Popular = () => {
  // const history = useHistory()
  const [moviesList, setMoviesList] = useState({
    isFetched: false,
    data: [],
    totalPages: 1,
    error: null,
  })
  // Pagination
  const [activePage, setActivePage] = useState(1)

  // Getting Popular movies
  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/movie/popular", {
        params: {
          api_key: "408c4caa837834514ec8de6e5f7b12df",
          page: activePage,
        },
      })
      .then((res) => {
        setMoviesList({
          isFetched: true,
          data: res.data.results,
          totalPages: res.data.total_pages,
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
  }, [activePage])

  const activePageChanger = page => {
    if (page > 0 && page <= moviesList.totalPages) {
      setActivePage(page)
      // history.push(`/popular/${page}`)// ? Not Working ? 🤷‍♂️🤔
    }
  }

  return (
    <div className="popular-movies-holder">
      <div className="container">
        {moviesList.isFetched ? (
          <div className="popular-movies-wrap">
            <Pagination
              activePage={activePage}
              setActivePage={activePageChanger}
              totalPages={moviesList.totalPages}
            />
            <div className="movies-list">
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

import { useState, useEffect } from 'react'
import axios from 'axios'

// Components
import ActorCard from '../../components/ActorCard/ActorCard'
import MovieCard from '../../components/MovieCard/MovieCard'
// import Recommendation from '../../components/Recommendation/Recommendation'

// Animation
import Loader from '../../components/Animation/Loader'

// SCSS
import './SingleMovie.scss'

const SingleMovie = ({ match }) => {
  const url_tmdb = `https://api.themoviedb.org/3/movie/${match.params.movie_id}`
  // MOVIE LIST
  const [movieInfo, setMovieInfo] = useState({
    isFetched: false,
    data: [],
    error: null,
  })
  // ACTORS LIST
  const [actorsList, setActorsList] = useState({
    isFetched: false,
    data: [],
    error: null,
  })
  // RECOMMENDATIONS LIST
  const [recommendation, setRecommendation] = useState({
    isFetched: false,
    data: [],
    error: null,
  })

  useEffect(() => {
    // MOVIE LIST
    axios
      .get(url_tmdb, {
        params: {
          api_key: "408c4caa837834514ec8de6e5f7b12df",
        },
      })
      .then((res) => {
        setMovieInfo({
          isFetched: true,
          data: res.data,
          error: false,
        })
      })
      .catch((err) => {
        setMovieInfo({
          isFetched: true,
          data: [],
          error: err,
        })
      })
      // ACTORS LIST
      axios
      .get(`${url_tmdb}/credits`, {
        params: {
          api_key: "408c4caa837834514ec8de6e5f7b12df",
        },
      })
      .then((res) => {
        setActorsList({
          isFetched: true,
          data: res.data,
          error: false,
        })
      })
      .catch((err) => {
        setActorsList({
          isFetched: true,
          data: [],
          error: err,
        })
      })
      // RECOMMENDATIONS LIST
      axios
      .get(`https://api.themoviedb.org/3/movie/${match.params.movie_id}/recommendations?`, {
        params: {
          api_key: "408c4caa837834514ec8de6e5f7b12df",
        },
      })
      .then((res) => {
        setRecommendation({
          isFetched: true,
          data: res.data.results,
          error: false,
        })
      })
      .catch((err) => {
        setRecommendation({
          isFetched: true,
          data: [],
          error: err,
        })
      })
  }, [])

  // Numbers Formatter - xx xxx xxx
  function formatNums(nums) {
    let numArr = [...`${nums}`].reverse()
    for (let i = 0; i < numArr.length; i+=4)
      numArr.splice(i, 0, ' ')
    return numArr.reverse()
  }

  const movieData = movieInfo.data
  const actorData = actorsList.data.cast
  const recData = recommendation.data

  return (
    <>
      {movieInfo.isFetched ? (
        <div className="movie-info-card">
          <img className="movie-backdrop" src={`https://image.tmdb.org/t/p/w500/${movieData.backdrop_path}`} alt={movieData.title}/>

          <div className="container">
            {/* Movie Info */}
            <div className="movie-info-wrap">
              <img className="movie-poster" src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`} alt={movieData.title}/>
              <div className="movie-info">
                <h2 className="movie-title">{movieData.title}</h2>
                <h4 className="movie-original-title">{movieData.original_title}</h4>
                <h3 className="movie-tagline">{movieData.tagline}</h3>
                <h3 className="movie-overview">Overview</h3>
                <p className="movie-overview summary">{movieData.overview}</p>
                <h4 className="movie-budget">
                  Budget:
                  <span>${formatNums(movieData.budget)}</span>
                </h4>
                <h4 className="movie-release-date">
                  Release date:
                  <span>{movieData.release_date}</span>
                </h4>
                <h4 className="movie-runtime">
                  Runtime:
                  <span>{movieData.runtime} min</span>
                </h4>
                <a className="site-link" href={movieData.homepage} target="_blank">
                  Official site
                  <img src="https://img.icons8.com/material/17/ffffff/external-link--v1.png" alt="External link icon"/>
                </a>
                <div className="movie-genres">
                  <b>Genres:</b>
                  {movieData.genres.map((genre, index) => (
                    <button className="movie-genre-btn" key={index}>{genre.name}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actors */}
            <div className="actors-wrap">
              <h2>Actors</h2>
              {actorsList.isFetched ? (
                <ul className="actors-list">
                  {
                    actorData.map((actor, index) => (
                      <ActorCard
                        id={actor.id}
                        name={actor.name}
                        charName={actor.character}
                        imgLink={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                        key={index}
                      />
                    ))
                  }
                </ul>
              ) : (
                <div className="loading">{Loader}</div>
              )}
            </div>

            {/* Recommendations */}
            <div className="recommendations-wrap">
              <h2>Recommendations</h2>
              {recommendation.isFetched ? (
                <ul className="rec-list">
                  {recData.map((movie, index) => (
                    <MovieCard
                      title={movie.title}
                      movie_id={movie.id}
                      imgLink={movie.poster_path}
                      rating={movie.vote_average}
                      releaseDate={movie.release_date}
                      key={index}
                    />
                  ))}
                </ul>
              ): (
                <div className="loading">{Loader}</div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="loading">{Loader}</div>
      )}
    </>
  )
}

export default SingleMovie

import { useState, useEffect } from 'react'
// Library
import axios from 'axios'
// Slick Carousel
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

// Data
import notToShow from '../../assets/data/NotToShow'
// Components
import ActorCard from '../../components/ActorCard/ActorCard'
import MovieCard from '../../components/MovieCard/MovieCard'
// import Recommendation from '../../components/Recommendation/Recommendation'
// Animation
import Loader from '../../components/Animation/Loader'

// SCSS
import './SingleMovie.scss'

const SingleMovie = ({ match }) => {
  // SLICK CAROUSEL SETTINGS
  // Actor Settings
  const actorSettings = {
    dots: false,
    speed: 1000,
    autoplay: true,
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 4,
    pauseOnFocus: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true,
  }
  // Recommendation Movie Settings
  const recSettings = {
    dots: false,
    speed: 1500,
    autoplay: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 4,
    pauseOnFocus: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true,
  }

  // URL
  const url_tmdb = `https://api.themoviedb.org/3/`
  // Movie List
  const [movieInfo, setMovieInfo] = useState({
    isFetched: false,
    data: [],
    error: null,
  })
  // Actors List
  const [actorsList, setActorsList] = useState({
    isFetched: false,
    data: [],
    error: null,
  })
  // Recommendations List
  const [recommendation, setRecommendation] = useState({
    isFetched: false,
    data: [],
    error: null,
  })

  useEffect(() => {
    // MOVIE LIST
    axios
      .get(`${url_tmdb}movie/${match.params.movie_id}`, {
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
      .get(`${url_tmdb}movie/${match.params.movie_id}/credits`, {
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
      .get(`${url_tmdb}movie/${match.params.movie_id}/recommendations`, {
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

  // Numbers Formatter - xx xxx xxx - 50 000 000
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
                <Slider {...actorSettings} className="actors-list">
                  {actorData.map(actor => (
                      <ActorCard
                        id={actor.id}
                        name={actor.name}
                        charName={actor.character}
                        imgLink={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                        key={actor.id}
                      />
                    ))}
                </Slider>
              ) : (
                <div className="loading">
                  <Loader />
                </div>
              )}
            </div>

            {/* Recommendations */}
            <div className="recommendations-wrap">
              <h2>Recommendations</h2>
              {recommendation.isFetched ? (
                <Slider {...recSettings} className="rec-list">
                  {recData.map(movie => (
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
                </Slider>
              ) : (
                <div className="loading">
                  <Loader />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="loading">
          <Loader />
        </div>
      )}
    </>
  )
}

export default SingleMovie

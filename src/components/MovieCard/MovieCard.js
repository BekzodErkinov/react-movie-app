import { Link } from 'react-router-dom'

// SCSS
import './MovieCard.scss'

const MovieCard = (props) => {
  const { movie_id, title, imgLink, rating, releaseDate } = props

  return (
    <Link to={`/movie/${movie_id}`} className="movie-card">
      <span className="movie-rating">{rating}</span>
      <img src={`https://image.tmdb.org/t/p/w500/${imgLink}`} alt={title} className="movie-img" />
      <div className="movie-lead">
        <h2 className="movie-title">{title}</h2>
        <h5 className="release-date">{releaseDate}</h5>
      </div>
    </Link>
  )
}

export default MovieCard

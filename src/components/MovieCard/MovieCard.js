import { Link } from 'react-router-dom'

// SCSS
import './MovieCard.scss'

const MovieCard = (props) => {
  const { movie_id, title, imgLink, rating, releaseDate } = props

  return (
    <div className="movie-card">
      <Link  to={`/movie/${movie_id}`} className="img-wrap" title={title}>
        <img src={`https://image.tmdb.org/t/p/w500/${imgLink}`} alt={title} className="movie-img" />
      </Link>
      <span className="movie-rating">{rating}</span>
      <div className="movie-lead">
        <Link to={`/movie/${movie_id}`} className="movie-title" title={title}>{title}</Link>
        <h5 className="release-date">{releaseDate}</h5>
      </div>
    </div>
  )
}

export default MovieCard

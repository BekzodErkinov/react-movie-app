import { Link } from 'react-router-dom'

// SCSS
import './ActorCard.scss'

const ActorCard = (props) => {
  const { id, name, charName, imgLink } = props

  return (
    <div className="actor-card">

      <Link to={`/movie/${id}/credits`} className="actor-link">
        <img className="actor-img" width="120" src={imgLink} alt={name} />
      </Link>
      <Link to={`/movie/${id}/credits`} className="actor-link actor-name-wrap">
        <h3 className="actor-name">{name}</h3>
        <h4 className="actor-char-name">{charName}</h4>
      </Link>
    </div>
  )
}

export default ActorCard

import { Link } from 'react-router-dom'

// SCSS
import './ActorCard.scss'

const ArtistCard = (props) => {
  const { id, name, charName, imgLink } = props

  return (
    <li className="artist-card">
      <Link to={`/actor/${id}`} className="actor-link">
        <img className="actor-img" width="120" src={imgLink} alt={name} />
      </Link>
      <Link to={`/actor/${id}`} className="actor-link actor-name-wrap">
        <h3 className="actor-name">{name}</h3>
        <h4 className="actor-char-name">{charName}</h4>
      </Link>
    </li>
  )
}

export default ArtistCard

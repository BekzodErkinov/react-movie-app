import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="header">
      <Link to="/">Home</Link>
      <Link to="/movies">Movies</Link>
      <Link to="/populars">Populars</Link>
    </div>
  )
}

export default Header

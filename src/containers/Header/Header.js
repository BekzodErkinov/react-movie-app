import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'

// SVG Icons
// import { cineramaLogo } from '../../assets/Icons/Icons'
// Animation
import loadingGIF from '../../assets/gif/loading.gif'
// SCSS
import './Header.scss'

const Header = () => {
  // Class Toggler
  // Show/Hide Search Input
  const [isActive, setActive] = useState(false)
  function handleToggle() {
    setActive(!isActive)
  }
  // Show/Hide Loading GIF
  const [isActiveLoading, setActiveLoading] = useState(false)
  function handleToggleLoading() {
    setActiveLoading(true)
    setTimeout(() => setActiveLoading(false) ,2000)
  }

  // Search🔍
  const history = useHistory()
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    if (searchText.length > 0)
      history.push(`/search/${searchText}`)
    else
      history.push(`/`)
  }, [searchText])

  return (
    <header className="site-header">
      <nav className="site-nav">
        <div className="container">
          <ul className="nav-links">
            <li className="nav-item">
              <Link className="brand-logo" to="/">
                <svg width="165" height="26" viewBox="0 0 165 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0 25.821V0H20.675V25.821H0ZM18.7954 3.20616C17.1579 2.33103 15.2758 1.83246 13.2729 1.83246C6.95272 1.83246 1.82964 6.79202 1.82964 12.9105C1.82964 19.029 6.95272 23.9885 13.2729 23.9885C15.2758 23.9885 17.1579 23.49 18.7954 22.6148V18.8781C17.3304 20.1493 15.3951 20.9229 13.2729 20.9229C8.70182 20.9229 4.99644 17.3357 4.99644 12.9105C4.99644 8.4853 8.70182 4.89818 13.2729 4.89818C15.3951 4.89818 17.3304 5.67176 18.7954 6.94296V3.20616Z" fill="white"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M22.5127 25.821V0H28.9449V25.821H22.5127ZM27.0401 1.83246H24.2842V23.9885H27.0401V1.83246Z" fill="white"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M30.7832 25.821V0H50.9988V25.821H30.7832ZM32.6012 1.83246V23.9885H35.3457V9.4486L49.0679 23.9885V1.83246H46.3235V16.6032L32.6012 1.83246Z" fill="white"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M52.8359 25.821V0H65.7004V25.821H52.8359ZM63.8708 23.9885V21.219H57.467V14.2952H63.8708V11.5257H57.467V4.60196H63.8708V1.83246H57.5336H54.7226V5.15811V11.1856V14.5112V21.3552V23.9885H57.5336H63.8708Z" fill="white"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M67.5303 25.821V0H85.9208V25.821H67.5303ZM81.8809 8.05133C81.8809 4.10205 79.3274 1.83246 76.3299 1.83246H69.2985V14.3186V23.9885H72.0545V14.2952H73.4383L80.3224 23.9885H83.997L77.0338 14.2701C79.595 13.9202 81.8809 11.6714 81.8809 8.05133Z" fill="#FFFF4D"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M113.507 25.821V0H139.254V25.821H113.507ZM119.028 1.83246L115.434 23.9885H118.606L120.297 11.1568L126.495 23.9885L132.692 11.1568L134.384 23.9885H137.556L133.961 1.83246L126.495 17.1892L119.028 1.83246Z" fill="#FFFF4D"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M141.093 25.821V0H165V25.821H141.093ZM163.171 23.9885L153.048 1.9306L142.926 23.9885H146.316L148.725 18.192H157.371L159.78 23.9885H163.171Z" fill="#FFFF4D"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M87.7598 25.821V0H111.667V25.821H87.7598ZM109.778 23.9885L99.6558 1.9306L89.5335 23.9885H92.9239L95.3328 18.192H103.979L106.388 23.9885H109.778Z" fill="#FFFF4D"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M72.0547 4.60199H74.5633C77.2276 4.60199 78.6989 6.00414 78.6989 8.09336C78.6989 10.1826 77.3911 11.295 74.5878 11.295H72.0547V4.60199Z" fill="#FFFF4D"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M102.992 15.8159L99.656 7.78961L96.3203 15.8159C98.5442 15.8159 100.768 15.8159 102.992 15.8159Z" fill="#FFFF67"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M156.383 15.8159L153.048 7.78961L149.712 15.8159C151.936 15.8159 154.159 15.8159 156.383 15.8159Z" fill="#FFFF67"/>
                </svg>
              </Link>
            </li>
            <li className="nav-item"><Link to="/movies" className="nav-link">Movies</Link></li>
            <li className="nav-item"><Link to="/tv-shows" className="nav-link">TV Shows</Link></li>
            <li className="nav-item"><Link to="/upcoming" className="nav-link">Upcoming</Link></li>
            {/* <li className="nav-item"><Link to="/cartoons" className="nav-link">Cartoons</Link></li> */}
            {/* <li className="nav-item"><Link to="/people" className="nav-link">People</Link></li> */}
            <li className="nav-item"><Link to="/popular" className="nav-link">Popular</Link></li>
            <li className="nav-item">
              <button
                className="search-btn"
                id="search-movie"
                onClick={handleToggle}
              >
                <img src="https://img.icons8.com/ios/40/ffffff/search--v1.png" alt="Search Icon" />
              </button>
              <button className="signup-modal-btn">Signup</button>
            </li>
          </ul>
        </div>
      </nav>
      {/* Search Bar */}
      <div className={`search-bar ${isActive ? 'show' : ''}`} id="search-bar">
        <div className="container">
          <form id="search_form" action="/search" acceptCharset="UTF-8">
            <label>
              <span className="search-wrapper">
                <input
                  type="text"
                  name="search_movie"
                  placeholder="Search..."
                  onChange={e => {
                    setSearchText(e.target.value)
                    handleToggleLoading()
                  }}
                  value={searchText}
                  required
                />
                <button className="search-clear-btn" type="button">
                  <img src="https://img.icons8.com/ios/35/000000/delete-sign--v3.png" alt="Delete sign" />
                </button>
                <img className={`loading-icon ${isActiveLoading ? 'show' : ''}`} src={loadingGIF} alt="Loading gif" />
              </span>
            </label>
          </form>
        </div>
      </div>
    </header>
  )
}

export default Header

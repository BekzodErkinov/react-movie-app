import {
  BrowserRouter as Router,
  Switch,
  Route } from 'react-router-dom'

// Pages
import {
  Home,
  Movies,
  TVShows,
  Popular,
  Upcoming,
  SearchPage,
  ActorMovies,
  // SingleTV,
  SingleMovie,
} from './pages'
// Containers
import Header from './containers/Header/Header'
import Footer from './containers/Footer/Footer'

function App() {


  return (
    <Router>
      <Header />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/movies" component={Movies} />
        <Route exact path="/tv-shows" component={TVShows} />
        <Route exact path="/popular" component={Popular} />
        <Route exact path="/upcoming" component={Upcoming} />
        <Route exact path="/movie/:actor_id/credits" component={ActorMovies} />
        {/* <Route exact path="/tv/:tv_id" component={SingleTVShows} /> */}
        <Route exact path="/actor/:actor_id" component={ActorMovies} />
        <Route exact path="/movie/:movie_id" component={SingleMovie} />
        <Route exact path="/search/:searchText" component={SearchPage} />
      </Switch>

      <Footer />
    </Router>
  )
}

export default App

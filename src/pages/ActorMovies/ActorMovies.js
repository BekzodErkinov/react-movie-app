import { useState, useEffect } from 'react'
// Library
import axios from 'axios'

// SCSS
import './ActorMovies.scss'

const ActorMovies = ({ match }) => {
  const [actorMovies, setActorMovies] = useState({
    isFetched: false,
    data: [],
    error: null,
  })

  useEffect(() => [
    axios
      .get(`https://api.themoviedb.org/3/movie/${match.params.movie_id}/credits`, {
        params: {
          api_key: "408c4caa837834514ec8de6e5f7b12df",
        },
      })
      .then((res) => {
        console.log(res);
        setActorMovies({
          isFetched: true,
          data: res.data,
          error: false,
        })
      })
      .catch((err) => {
        setActorMovies({
          isFetched: true,
          data: [],
          error: err,
        })
      })
  ], [])

  console.log(actorMovies)

  return (
    <div>
      <h1>ActorMovies</h1>
    </div>
  )
}

export default ActorMovies

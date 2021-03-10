import { useState, useEffect } from 'react'
import axios from 'axios'

// SCSS
import './Recommendation.scss'

const Recommendation = ({ match }) => {
  const [recommendation, setRecommendation] = useState({
    isFetched: false,
    data: [],
    error: null,
  })

  useEffect(() => {
    axios
    .get(`https://api.themoviedb.org/3/movie/${match}/recommendations?`, {
      params: {
        api_key: "408c4caa837834514ec8de6e5f7b12df",
      },
    })
    .then((res) => {
      setRecommendation({
        isFetched: true,
        data: res.data,
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

  // console.log(match);

  return (
    <div>
      <h2>Recommendation</h2>

    </div>
  )
}

export default Recommendation

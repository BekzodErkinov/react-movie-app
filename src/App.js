import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route } from 'react-router-dom'
// Pages
import Home from './page/Home/Home'
import Movies from './page/Movies/Movies'
import Populars from './page/Populars/Populars'
import SingleMovie from './page/SingleMovie/SingleMovie'

import Header from './container/Header/Header'

function App() {  
  return (
    <Router>
      <Header />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/movies" component={Movies} />
        <Route path="/populars" component={Populars} />
        <Route path="/movie/:id" component={SingleMovie} /> 
      </Switch>
    </Router>
  )
}

export default App

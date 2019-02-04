import React, { Component } from 'react';
import Movie from './Movie'
import './App.css';


class App extends Component {
  // Render: componentWillMount -> render -> componentDidMount
  // Update: componentWillReceiveProps -> shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate

  state = {}

  componentWillMount() {
    console.log('will mount');
  }
  // render()
  componentDidMount() {
    this._getMovies();
  }

  _getMovies = async () => {
    const movies = await this._callApi();
    this.setState({ movies })
    console.log(movies);
  }

  _callApi = () => {
    return fetch('https://yts.am/api/v2/list_movies.json?sort_by=download_count')
      .then(response => response.json())
      .then(json => json.data.movies)
      .catch(err => console.log(err));
  }
  _renderMovies = () => {
    const movies = this.state.movies.map(movie => {
      return (
        <Movie
          title={movie.title_english}
          poster={movie.medium_cover_image}
          key={movie.id}
          genres={movie.genres}
          // rating={movie.rating}
          synopsis={movie.synopsis}
        />
      )
    })
    return movies;
  }
  render() {
    console.log('render');
    const { movies } = this.state;
    return (
      <div className={movies ? "App" : "App--loading"}>
        {movies ? this._renderMovies() : 'Loading!!'}
      </div>
    );
  }
}


export default App;

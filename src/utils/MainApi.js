// запросы к моему API

class Api {
  constructor({ url, headers }) {
    this.url = url;
    this.headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return Promise.resolve(res.json());
    }
    return Promise.reject(res.status);
  }

  register = (name, email, password) => {
    return fetch(`${this.url}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log(`Некорректно заполнено одно из полей ${err}`);
        } else {
          console.log(`Что-то пошло не так, а точнее: ${err}`);
        }
      });
  };

  login = (email, password) => {
    return fetch(`${this.url}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
    .then((res) => {
      return this._checkResponse(res);
    });
  };

  getCurrentUser() {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      headers: this.headers,
    }).then(this._checkResponse);
  }

  editProfile(name, email) {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    }).then(this._checkResponse);
  }

  saveMovie(movie) {
    return fetch(`${this.url}/movies`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image.url,
        trailerLink: movie.trailerLink,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: movie.image.url,
        movieId: movie.id,
      }),
    }).then(this._checkResponse);
  }

  deleteMovie(movie) {
    console.log('api delete')
    console.log(movie)
    return fetch(`${this.url}/movies/${movie._id}`, {
      method: "DELETE",
      headers: this.headers,
      body: JSON.stringify({
        movieId: movie._id,
      }),
    }).then(this._checkResponse);
  }

  getSavedMovies() {
      return fetch(`${this.url}/movies`, {
        method: 'GET',
        headers: this.headers,
      }).then(this._checkResponse);
  }
}

const mainApi = new Api({
  url: "https://berezhetska.diploma.nomorepartiesxyz.ru",
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    "Content-Type": "application/json",
  },
});

export default mainApi;
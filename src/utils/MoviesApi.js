// запросы к сервису beatfilm-movies

class Api {
  constructor({ url, headers }) {
    this.url = url;
    this.headers = headers;
  }

  _checkResponse(res) {
    if(res.ok) {
      return Promise.resolve(res.json());
    }
    return Promise.reject(res.status);
  }

  getMovies() {
    return fetch(this.url, {
      headers: this.headers,
    }).then(this._checkResponse);
  }

}

const moviesApi = new Api({
  url: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    // authorization: `Bearer ${localStorage.getItem('token')}`,
    "Content-Type": "application/json",
  },
});

export default moviesApi;
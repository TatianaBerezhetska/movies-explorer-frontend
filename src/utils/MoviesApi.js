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

  getMovies = () => {
    return fetch(this.url, {
      method: 'GET',
      headers: this.headers,
    }).then((res) => this._checkResponse(res))
    .then((data) => data);
  }

}

const moviesApi = new Api({
  url: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "Content-Type": "application/json",
  },
});

export default moviesApi;
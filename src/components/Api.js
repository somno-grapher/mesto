export default class Api {

  constructor(basePath, token) {
    this._basePath = basePath;
    this._token = token;
  }

  _getJsonPromise(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(
      `${this._basePath}/cards`,
      {
        headers: {
          authorization: this._token
        }
      }
    )
      .then(this._getJsonPromise);
  }

}

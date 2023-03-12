export default class Api {

  constructor(basePath, token) {
    this._basePath = basePath;
    this._token = token;
  }

  _getHeaders() {
    return {
      "Content-Type": "application/json",
      authorization: this._token,
    };
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
        headers: this._getHeaders()
      }
    )
      .then(this._getJsonPromise);
  }

  postCard(item) {
    return fetch(
      `${this._basePath}/cards`,
      {
        method: 'POST',
        headers: this._getHeaders(),
        body: JSON.stringify(item)
      }
    )
      .then(this._getJsonPromise);
  }

  getCurrentUser() {
    return fetch(
      `${this._basePath}/users/me`,
      {
        headers: this._getHeaders(),
      }
    )
      .then(this._getJsonPromise);
  }

}

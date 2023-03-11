import { data } from "autoprefixer";

export default class Api {

  // constructor() {

  // }

  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-61/cards', {
      headers: {
        authorization: '77f77b05-b295-4c6a-bc0b-34525fb16730'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

}

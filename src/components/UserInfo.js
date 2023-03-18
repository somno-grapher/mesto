export default class UserInfo {

  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return { name: this._name.textContent, about: this._about.textContent, avatar: this._avatar.src };
  }

  setAvatar(data) {
    this._avatar.src = data.avatar;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
  }

  setInitialUserInfo(data) {
    this.setUserInfo(data);
    this.setAvatar(data);
  }

}

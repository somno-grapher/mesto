import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {

  open(item) {
    this._photo = this._popupElement.querySelector('.full-photo');
    this._title = this._popupElement.querySelector('.popup__title');
    this._photo.src = item.link;
    this._photo.alt = item.name;
    this._title.textContent = item.name;
    super.open();
  }

}

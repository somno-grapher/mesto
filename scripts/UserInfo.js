export default class Popup {

  constructor(selector) {
    this._closeButtonClass = 'popup__close-button';
    this._escKey = 'Escape';
    this._popupElement = document.querySelector(selector);
    this._popupOpenedClass = 'popup_opened';
  }

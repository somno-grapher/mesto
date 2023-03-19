import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(selector) {
    super(selector);
    this._form = this._popupElement.querySelector('form');
    this._submitFormHandler = null;
  }

  open(submitFormHandler) {
    super.open();
    this._submitFormHandler = submitFormHandler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => this._submitForm(event));
  }

  _submitForm(event) {
    event.preventDefault();
    this._submitFormHandler();
  }

}

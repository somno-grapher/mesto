import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(selector) {
    super(selector);
    this._form = this._popupElement.querySelector('form');
    // this._buttonConfirm = this._form.querySelector('.save-button');
    // this._buttonConfirmNormalTextContent = this._buttonConfirm.textContent;
    this._submitFormHandler = null;
  }

  // close() {
  //   super.close();
    // this._releaseBusyState();
  // }

  open(submitFormHandler) {
    super.open();
    this._submitFormHandler = submitFormHandler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => this._submitForm(event));
  }

  // _setBusyState() {
  //   this._buttonConfirm.textContent = "Сохранение...";
  // }

  // _releaseBusyState() {
  //   this._buttonConfirm.textContent = this._buttonConfirmNormalTextContent;
  // }

  _submitForm(event) {
    event.preventDefault();
    // this._setBusyState();
    this._submitFormHandler();
    this.close();
  }

}

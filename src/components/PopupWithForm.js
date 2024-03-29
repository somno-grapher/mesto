import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, submitFormHandler) {
    super(selector);
    this._submitFormHandler = submitFormHandler;
    this._form = this._popupElement.querySelector('form');
    this._inputList = this._form.querySelectorAll('input');
    this._buttonConfirm = this._form.querySelector('.save-button');
    this._buttonConfirmNormalTextContent = this._buttonConfirm.textContent;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => this._submitForm(event));
  }

  _setBusyState() {
    this._buttonConfirm.textContent = "Сохранение...";
  }

  releaseBusyState() {
    this._buttonConfirm.textContent = this._buttonConfirmNormalTextContent;
  }

  _submitForm(event) {
    event.preventDefault();
    this._setBusyState();
    this._submitFormHandler(this._getInputValues());
  }

}

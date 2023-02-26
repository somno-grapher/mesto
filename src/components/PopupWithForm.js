import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, submitFormHandler) {
    super(selector);
    this._submitFormHandler = submitFormHandler;
    this.form = this._popupElement.querySelector('form');
  }

  _getInputValues() {
    this._inputList = this.form.querySelectorAll('input');
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  close() {
    super.close();
    this.form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', (event) => this._submitForm(event));
  }

  _submitForm(event) {
    event.preventDefault();
    this._submitFormHandler(this._getInputValues());
    this.close();
  }

}

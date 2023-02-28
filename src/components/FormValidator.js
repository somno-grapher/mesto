export default class FormValidator {

  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(this._settings.saveButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
  }


  // private methods: ascending order

  _addInputListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isInputValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _getErrorClassByInputId(inputElement) {
    return '.' + inputElement.id + '-error';
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(this._getErrorClassByInputId(inputElement));
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._settings.errorClass);
  }

  _isInputValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(this._getErrorClassByInputId(inputElement));
    const errorMessage = inputElement.validationMessage;
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._settings.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  };


  // public methods: ascending order

  enableValidation() {
    this._addInputListeners();
  }

  validateOnOpening() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  };

}


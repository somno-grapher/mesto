// * classes: ascending order

class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(this._settings.saveButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
  }

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
      this._buttonElement.type = 'button';
    } else {
      this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
      this._buttonElement.type = 'submit';
    }
  };

  validateOnOpening() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  };

  enableValidation() {
    this._addInputListeners();
  }
}


// * main code

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  saveButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const addCardFormValidator = new FormValidator(validationSettings, addCardForm);
addCardButton.addEventListener('click', () => {
  addCardFormValidator.validateOnOpening();
});
addCardFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator(validationSettings, editProfileForm);
editProfileButton.addEventListener('click', () => {
  editProfileFormValidator.validateOnOpening();
});
editProfileFormValidator.enableValidation();

// * vars: ascending order

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  saveButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}


// * functions: ascending order

function addInputListeners(formElement, inputErrorClass, errorClass, inputSelector, saveButtonSelector, inactiveButtonClass) {
  const buttonElement = formElement.querySelector(saveButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isInputValid(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    addInputListeners(formElement, settings.inputErrorClass, settings.errorClass, settings.inputSelector, settings.saveButtonSelector, settings.inactiveButtonClass);
  });
};

function getErrorClassByInputId(inputElement) {
  return '.' + inputElement.id + '-error';
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

function hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(getErrorClassByInputId(inputElement));
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
}

function isInputValid(formElement, inputElement, inputErrorClass, errorClass) {
  const errorMessage = inputElement.validationMessage;
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
}

function showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(getErrorClassByInputId(inputElement));
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.type = 'button';
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.type = 'submit';
  }
};

function validateFormOnOpening(formElement, inputErrorClass, errorClass, inputSelector, saveButtonSelector, inactiveButtonClass) {
  const buttonElement = formElement.querySelector(saveButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  });
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
};


// * event listeners: ascending order

addCardButton.addEventListener('click', () => {
  validateFormOnOpening(addCardForm, validationSettings.inputErrorClass, validationSettings.errorClass, validationSettings.inputSelector, validationSettings.saveButtonSelector, validationSettings.inactiveButtonClass);
});

editProfileButton.addEventListener('click', () => {
  validateFormOnOpening(editProfileForm, validationSettings.inputErrorClass, validationSettings.errorClass, validationSettings.inputSelector, validationSettings.saveButtonSelector, validationSettings.inactiveButtonClass);
});


// * main code

// enableValidation(validationSettings);

// ! class FormValidator
class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(this._settings.saveButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));

  }

  _addInputListeners() {
    // toggleButtonState(inputList, buttonElement, inactiveButtonClass);
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

  // function validateFormOnOpening(formElement, inputErrorClass, errorClass, inputSelector, saveButtonSelector, inactiveButtonClass) {
  //   const buttonElement = formElement.querySelector(saveButtonSelector);
  //   const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  //   inputList.forEach((inputElement) => {
  //     hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  //   });
  //   toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  // };

  enableValidation() {
    this._addInputListeners();
  }
}

function enableValidation2(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    const formValidator = new FormValidator(settings, formElement);
    formValidator.enableValidation();
  });
};

enableValidation2(validationSettings);


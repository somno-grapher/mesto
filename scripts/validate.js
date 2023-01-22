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

function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    setInputListeners(formElement, settings.inputErrorClass, settings.errorClass, settings.inputSelector, settings.saveButtonSelector, settings.inactiveButtonClass);
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

function setInputListeners(formElement, inputErrorClass, errorClass, inputSelector, saveButtonSelector, inactiveButtonClass) {
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


// * main code

enableValidation(validationSettings);

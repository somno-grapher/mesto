// function enableValidation(settings) {
//   showInputError(editProfileForm, profileAboutInput, profileAboutInput.validationMessage);
// }

function getErrorClassByInputId(inputElement) {
  return '.' + inputElement.id + '-error';
}

function hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(getErrorClassByInputId(inputElement));
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
}

function isValid(formElement, inputElement, inputErrorClass, errorClass) {
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

showInputError(editProfileForm, profileNameInput, profileNameInput.validationMessage, 'popup__input_type_error', 'popup__error_visible');

hideInputError(editProfileForm, profileNameInput, 'popup__input_type_error', 'popup__error_visible');

isValid(editProfileForm, profileNameInput, 'popup__input_type_error', 'popup__error_visible');


// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__save-button',
//   inactiveButtonClass: 'popup__save-button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// });

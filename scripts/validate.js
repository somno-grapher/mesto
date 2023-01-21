// function enableValidation(settings) {
//   showInputError(editProfileForm, profileAboutInput, profileAboutInput.validationMessage);
// }

function getErrorClassByInputId(inputElement) {
  return '.' + inputElement.id + '-error';
}

function showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(getErrorClassByInputId(inputElement));
  inputElement.classList.add(inputErrorClass);
  // ! remove ''
  errorElement.textContent = 'errorMessage';
  errorElement.classList.add(errorClass);
}

showInputError(editProfileForm, profileNameInput, profileNameInput.validationMessage, 'popup__input_type_error', 'popup__error_visible');

// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__save-button',
//   inactiveButtonClass: 'popup__save-button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// });

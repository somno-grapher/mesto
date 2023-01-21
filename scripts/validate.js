// function enableValidation(settings) {
//   showInputError(editProfileForm, profileAboutInput, profileAboutInput.validationMessage);
// }

function getErrorClassByInputId(inputElement) {
  return '.' + inputElement.id + '-error';
}

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(getErrorClassByInputId(inputElement));
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_visible');
}

showInputError(editProfileForm, profileNameInput, profileNameInput.validationMessage);

// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__save-button',
//   inactiveButtonClass: 'popup__save-button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// });

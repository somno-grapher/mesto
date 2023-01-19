// function enableValidation(settings) {
//   showInputError(editProfileForm, profileAboutInput, profileAboutInput.validationMessage);
// }

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = 'Вы пропустили это поле errorMessage ffffffffffffffffffffffffffffffffffffffffffff';
  errorElement.classList.add('popup__error_visible');
}

showInputError(editProfileForm, profileNameInput, profileNameInput.validationMessage);

// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// });

const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close-button');
const popupForm = popup.querySelector('.popup__container');
const profileEditButton = document.querySelector('.profile__edit-button');

let popupAboutInput = popupForm.querySelector('.input-field_name_profile-about');
let popupNameInput = popupForm.querySelector('.input-field_name_profile-name');
let profileAbout = document.querySelector('.profile__about');
let profileName = document.querySelector('.profile__name');

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = popupNameInput.value;
  profileAbout.textContent = popupAboutInput.value;
  closePopup(popup);
}

popupForm.addEventListener('submit', handleFormSubmit);

popupCloseButton.addEventListener('click', function () {
  closePopup(popup);
});

profileEditButton.addEventListener('click', function () {
  popup.classList.add('popup_opened');
  popupNameInput.value = profileName.textContent;
  popupAboutInput.value = profileAbout.textContent;
});

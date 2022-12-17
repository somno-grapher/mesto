const popup = document.querySelector('.popup');
const popupContainer = popup.querySelector('.popup__container');
const popupCloseButton = popupContainer.querySelector('.popup__close-button');
const profileEditButton = document.querySelector('.profile__edit-button');

let popupAboutInput = popupContainer.querySelector('.popup__about-input');
let popupNameInput = popupContainer.querySelector('.popup__name-input');
let profileAbout = document.querySelector('.profile__about');
let profileName = document.querySelector('.profile__name');

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

popupContainer.addEventListener('submit', function (event) {
  event.preventDefault();
  profileName.textContent = popupNameInput.value;
  profileAbout.textContent = popupAboutInput.value;
  closePopup(popup);
});

popupCloseButton.addEventListener('click', function () {
  closePopup(popup);
});

profileEditButton.addEventListener('click', function () {
  popup.classList.add('popup_opened');
  popupNameInput.value = profileName.textContent;
  popupAboutInput.value = profileAbout.textContent;
});

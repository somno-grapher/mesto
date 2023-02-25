import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import Section from './Section.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';

// * vars: pseudo-ascending order

// root vars derived from literals
const addCardPopupSelector = '.popup_type_add-card';
const cardSettings = {
  templateSelector: '#card-template',
  itemSelector: '.card',
  deleteButtonSelector: '.delete-button',
  likeButtonSelector: '.like-button',
  photoSelector: '.card__photo',
  titleSelector: '.card__title',
  interactiveElementClass: 'mix-interactive-element',
  likeButtonLikedClass: 'like-button_liked',
  showPhotoPopupSelector: '.popup_type_show-photo',
  fullPhotoSelector: '.full-photo',
  fullPhotoTitle: '.popup__title'
}
const editProfilePopupSelector = '.popup_type_edit-profile';
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const photoGridListSelector = '.photo-grid__list';
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  saveButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// root vars derived from document and literals
const addCardButton = document.querySelector('.add-button_type_card');
const addCardForm = document.forms['add-card-form'];
const editProfileButton = document.querySelector('.edit-button_type_profile');
const editProfileForm = document.forms['edit-profile-form'];
const profileAbout = document.querySelector('.profile__about');
const profileName = document.querySelector('.profile__name');

// root vars derived from editProfileForm and literals
const profileAboutInput = editProfileForm.querySelector('.input-field_name_profile-about');
const profileNameInput = editProfileForm.querySelector('.input-field_name_profile-name');

// form validators
const addCardFormValidator = new FormValidator(validationSettings, addCardForm);
const editProfileFormValidator = new FormValidator(validationSettings, editProfileForm);


// * functions: ascending order

function submitAddCardForm(data) {
  const cardElement = new Card({ name: data['card-title'], link: data['card-photo-link'] }, cardSettings, showPhotoPopup.open.bind(showPhotoPopup)).generateCardElement();
  photoGridList.addItem(cardElement, true);
};

function submitEditProfileForm(data) {
  profileName.textContent = data['profile-name'];
  profileAbout.textContent = data['profile-about'];
};


// * main code

const addCardPopup = new PopupWithForm(addCardPopupSelector, submitAddCardForm);
addCardPopup.setEventListeners();
const editProfilePopup = new PopupWithForm(editProfilePopupSelector, submitEditProfileForm);
editProfilePopup.setEventListeners();
const showPhotoPopup = new PopupWithImage('.popup_type_show-photo');
showPhotoPopup.setEventListeners();
const photoGridList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = new Card(item, cardSettings, showPhotoPopup.open.bind(showPhotoPopup)).generateCardElement();
      photoGridList.addItem(cardElement, false);
    }
  },
  photoGridListSelector
  );
photoGridList.generateAndAddInitialItems();


// add event listeners

addCardButton.addEventListener('click', () => {
  addCardFormValidator.validateOnOpening();
  addCardPopup.open();
});

editProfileButton.addEventListener('click', () => {
  profileNameInput.value = profileName.textContent;
  profileAboutInput.value = profileAbout.textContent;
  editProfileFormValidator.validateOnOpening();
  editProfilePopup.open();
});


// implement validation on input

addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();

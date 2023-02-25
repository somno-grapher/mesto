import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import Section from './Section.js';
import PopupWithForm from './PopupWithForm.js';

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
const closeButtonClass = 'popup__close-button';
const editProfilePopupSelector = '.popup_type_edit-profile';
const escKey = 'Escape';
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
const popupFormSelector = '.popup__form';
const popupOpenedClass = 'popup_opened';
const popupSelector = '.popup';
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
// !
// const addCardPopup = document.querySelector('.popup_type_add-card');
const editProfileButton = document.querySelector('.edit-button_type_profile');
const editProfileForm = document.forms['edit-profile-form'];
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const profileAbout = document.querySelector('.profile__about');
// const photoGridList = document.querySelector('.photo-grid__list');
const profileName = document.querySelector('.profile__name');
const showPhotoPopup = document.querySelector('.popup_type_show-photo');


// root vars derived from addCardForm and literals
const cardTitleInput = addCardForm.querySelector('.input-field_name_card-title');
const cardPhotoLinkInput = addCardForm.querySelector('.input-field_name_card-photo-link');


// root vars derived from editProfileForm and literals
const profileAboutInput = editProfileForm.querySelector('.input-field_name_profile-about');
const profileNameInput = editProfileForm.querySelector('.input-field_name_profile-name');

// showPhotoPopup scope
const photoPopupComponents = {
  popup: showPhotoPopup,
  photo: showPhotoPopup.querySelector('.full-photo'),
  title: showPhotoPopup.querySelector('.popup__title')
}

// form validators
const addCardFormValidator = new FormValidator(validationSettings, addCardForm);
const editProfileFormValidator = new FormValidator(validationSettings, editProfileForm);



// * functions: ascending order

// !original
function addPopupClosingClickListeners(popupSelector) {
  const popupList = Array.from(document.querySelectorAll(popupSelector));
  popupList.forEach((popup) => {
    popup.addEventListener('click', (event) => {
      if ((event.currentTarget === event.target) || (event.target.classList.contains(closeButtonClass))) {
        closePopup(popup);
      }
    });
  });
}

// !original
function closePopup(popup) {
  popup.classList.remove(popupOpenedClass);
  document.removeEventListener('keyup', handleEscUp);
  const formElement = popup.querySelector(popupFormSelector);
  if (formElement) {
    formElement.reset();
  }
}

// !original
function handleEscUp(event) {
  if (event.key === escKey) {
    const activePopup = document.querySelector('.' + popupOpenedClass);
    closePopup(activePopup);
  };
};

const handleShowPhoto = function (item, photo, photoPopupComponents, openPopup) {
  photo.addEventListener('click', () => {
    photoPopupComponents.photo.src = item.link;
    photoPopupComponents.photo.alt = item.name;
    photoPopupComponents.title.textContent = item.name;
    openPopup(photoPopupComponents.popup);
  });
}

// !original
const openPopup = function (popup) {
  popup.classList.add(popupOpenedClass);
  document.addEventListener('keyup', handleEscUp);
};

function submitAddCardForm(data) {
  // event.preventDefault();
  const cardElement = new Card({ name: data['card-title'], link: data['card-photo-link'] }, cardSettings, handleShowPhoto, photoPopupComponents, openPopup).generateCardElement();
  photoGridList.addItem(cardElement, true);
  // !to be moved to close method
  // addCardForm.reset();
  // closePopup(addCardPopup);
  // addCardPopup.close();
};

function submitEditProfileForm(data) {
  // event.preventDefault();
  // profileName.textContent = profileNameInput.value;
  // profileAbout.textContent = profileAboutInput.value;
  profileName.textContent = data['profile-name'];
  profileAbout.textContent = data['profile-about'];
  // closePopup(editProfilePopup);
};


// * main code

// !original
// addCardButton.addEventListener('click', () => {
//   addCardFormValidator.validateOnOpening();
//   openPopup(addCardPopup);
// });

const photoGridList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = new Card(item, cardSettings, handleShowPhoto, photoPopupComponents, openPopup).generateCardElement();
      photoGridList.addItem(cardElement, false);
    }
  },
  photoGridListSelector
);
photoGridList.generateAndAddInitialItems();
const addCardPopup = new PopupWithForm(addCardPopupSelector, submitAddCardForm);
addCardPopup.setEventListeners();
const editProfilePopup2 = new PopupWithForm(editProfilePopupSelector, submitEditProfileForm);
editProfilePopup2.setEventListeners();

// add event listeners

addCardButton.addEventListener('click', () => {
  addCardFormValidator.validateOnOpening();
  addCardPopup.open();
});

// ! original
// addCardForm.addEventListener('submit', submitAddCardForm);

// addPopupClosingClickListeners(popupSelector);

editProfileButton.addEventListener('click', () => {
  profileNameInput.value = profileName.textContent;
  profileAboutInput.value = profileAbout.textContent;
  editProfileFormValidator.validateOnOpening();
  editProfilePopup2.open();
});

// editProfileForm.addEventListener('submit', submitEditProfileForm);


// implement validation on input

addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();

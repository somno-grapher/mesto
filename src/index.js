// * imported css: ascending
import './pages/index.css';

// * imported js: ascending
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
import Section from './components/Section.js';
import UserInfo from './components/UserInfo.js';

// * vars derived from literals: ascending
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
const userInfoSelectors = {
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about'
};
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  saveButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// * functions: ascending
function submitAddCardForm(data) {
  const cardElement = new Card({ name: data['card-title'], link: data['card-photo-link'] }, cardSettings, showPhotoPopup.open.bind(showPhotoPopup)).generateCardElement();
  photoGridList.addItem(cardElement, true);
};

// * main code

// user info features
const userInfo = new UserInfo(userInfoSelectors);

// adding card features
const addCardPopup = new PopupWithForm(addCardPopupSelector, submitAddCardForm);
const addCardForm = addCardPopup.form;
addCardPopup.setEventListeners();
const addCardFormValidator = new FormValidator(validationSettings, addCardForm);
addCardFormValidator.enableValidation();
const addCardButton = document.querySelector('.add-button_type_card');
addCardButton.addEventListener('click', () => {
  addCardFormValidator.validateOnOpening();
  addCardPopup.open();
});

// editing profile features
const editProfilePopup = new PopupWithForm(editProfilePopupSelector, userInfo.setUserInfo.bind(userInfo));
const editProfileForm = editProfilePopup.form;
const profileAboutInput = editProfileForm.querySelector('.input-field_name_profile-about');
const profileNameInput = editProfileForm.querySelector('.input-field_name_profile-name');
editProfilePopup.setEventListeners();
const editProfileFormValidator = new FormValidator(validationSettings, editProfileForm);
editProfileFormValidator.enableValidation();
const editProfileButton = document.querySelector('.edit-button_type_profile');
editProfileButton.addEventListener('click', () => {
  const userInfoData = userInfo.getUserInfo();
  profileNameInput.value = userInfoData.name;
  profileAboutInput.value = userInfoData.about;
  editProfileFormValidator.validateOnOpening();
  editProfilePopup.open();
});

// showing photo features
const showPhotoPopup = new PopupWithImage('.popup_type_show-photo');
showPhotoPopup.setEventListeners();

// photo grid features
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

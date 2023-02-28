// * imported css: ascending
import './index.css';

// * imported js: ascending
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

// * vars derived from literals: ascending
const popupCardAddSelector = '.popup_type_add-card';
const cardSettings = {
  templateSelector: '#card-template',
  itemSelector: '.card',
  buttonDeleteSelector: '.delete-button',
  buttonLikeSelector: '.like-button',
  photoSelector: '.card__photo',
  titleSelector: '.card__title',
  buttonLikeLikedClass: 'like-button_liked',
  fullPhotoSelector: '.full-photo',
  fullPhotoTitle: '.popup__title'
}
const popupProfileEditSelector = '.popup_type_edit-profile';
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

function createCard(item) {
  const cardElement = new Card(item, cardSettings, showPhotoPopup.open.bind(showPhotoPopup)).generateCardElement();
  return cardElement;
}

function submitAddCardForm(data) {
  const item = {
    name: data['card-title'],
    link: data['card-photo-link']
  };
  const cardElement = createCard(item);
  photoGridList.addItem(cardElement, true);
};

// * main code

// user info features
const userInfo = new UserInfo(userInfoSelectors);

// adding card features
const popupCardAdd = new PopupWithForm(popupCardAddSelector, submitAddCardForm);
const formCardAdd = popupCardAdd.form;
popupCardAdd.setEventListeners();
const formCardAddValidator = new FormValidator(validationSettings, formCardAdd);
formCardAddValidator.enableValidation();
const buttonCardAdd = document.querySelector('.add-button_type_card');
buttonCardAdd.addEventListener('click', () => {
  formCardAddValidator.validateOnOpening();
  popupCardAdd.open();
});

// editing profile features
const popupProfileEdit = new PopupWithForm(popupProfileEditSelector, userInfo.setUserInfo.bind(userInfo));
const formProfileEdit = popupProfileEdit.form;
const profileAboutInput = formProfileEdit.querySelector('.input-field_name_profile-about');
const profileNameInput = formProfileEdit.querySelector('.input-field_name_profile-name');
popupProfileEdit.setEventListeners();
const formProfileEditValidator = new FormValidator(validationSettings, formProfileEdit);
formProfileEditValidator.enableValidation();
const buttonProfileEdit = document.querySelector('.edit-button_type_profile');
buttonProfileEdit.addEventListener('click', () => {
  const userInfoData = userInfo.getUserInfo();
  profileNameInput.value = userInfoData.name;
  profileAboutInput.value = userInfoData.about;
  formProfileEditValidator.validateOnOpening();
  popupProfileEdit.open();
});

// showing photo features
const showPhotoPopup = new PopupWithImage('.popup_type_show-photo');
showPhotoPopup.setEventListeners();

// photo grid features
const photoGridList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      photoGridList.addItem(cardElement, false);
    }
  },
  photoGridListSelector
);
photoGridList.generateAndAddInitialItems();

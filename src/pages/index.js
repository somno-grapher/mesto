// * imported css: ascending
import './index.css';

// * imported js: ascending
import Api from '../components/Api.js';
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
  buttonDeleteHiddenClass: 'card__delete-button_hidden',
  buttonLikeSelector: '.like-button',
  photoSelector: '.card__photo',
  titleSelector: '.card__title',
  buttonLikeLikedClass: 'like-button_liked',
  fullPhotoSelector: '.full-photo',
  fullPhotoTitle: '.popup__title'
}
const popupProfileEditSelector = '.popup_type_edit-profile';
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
  const cardElement = new Card(
    item,
    currentUserId,
    cardSettings,
    showPhotoPopup.open.bind(showPhotoPopup)
  )
    .generateCardElement();
  return cardElement;
}

function submitAddCardForm(formValues) {
  const item = {
    name: formValues['card-title'],
    link: formValues['card-photo-link']
  };
  api.postCard(item)
    .then(jsonResponseCard => {
      const cardElement = createCard(jsonResponseCard);
      photoGridList.addItem(cardElement, true);
    })
    .catch(err => {
      console.log(err);
    });
};

// * main code

// user info features
const userInfo = new UserInfo(userInfoSelectors);

// adding card features
const popupCardAdd = new PopupWithForm(popupCardAddSelector, submitAddCardForm);
popupCardAdd.setEventListeners();
const formElementCardAdd = document.forms['add-card-form'];
const formCardAddValidator = new FormValidator(validationSettings, formElementCardAdd);
formCardAddValidator.enableValidation();
const buttonCardAdd = document.querySelector('.add-button_type_card');
buttonCardAdd.addEventListener('click', () => {
  formCardAddValidator.validateOnOpening();
  popupCardAdd.open();
});

// editing profile features
const popupProfileEdit = new PopupWithForm(popupProfileEditSelector, userInfo.setUserInfo.bind(userInfo));
popupProfileEdit.setEventListeners();
const formElementProfileEdit = document.forms['edit-profile-form'];
const profileAboutInput = formElementProfileEdit.querySelector('.input-field_name_profile-about');
const profileNameInput = formElementProfileEdit.querySelector('.input-field_name_profile-name');
const formProfileEditValidator = new FormValidator(validationSettings, formElementProfileEdit);
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
  item => {
    const cardElement = createCard(item);
    photoGridList.addItem(cardElement, false);
  },
  photoGridListSelector
);


// api features

const api = new Api(
  'https://mesto.nomoreparties.co/v1/cohort-61',
  '77f77b05-b295-4c6a-bc0b-34525fb16730'
);

let currentUserId;

Promise.all(
  [
    api.getCurrentUser(),
    api.getInitialCards()
  ]
)
  .then(
    (
      [
        jsonResponseUser,
        jsonResponseCards
      ]
    ) => {
      currentUserId = jsonResponseUser._id;
      photoGridList.generateAndAddInitialItems(jsonResponseCards);
      console.log(currentUserId);
    }
  )
  .catch(err => {
    console.log(err);
  });


// * imported css: ascending
import './index.css';

// * imported js: ascending
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

// * vars derived from literals: ascending
const cardSettings = {
  itemSelector: '.card',
  buttonDeleteHiddenClass: 'card__delete-button_hidden',
  buttonDeleteSelector: '.delete-button',
  buttonLikeLikedClass: 'like-button_liked',
  buttonLikeSelector: '.like-button',
  imageSelector: '.card__photo',
  likesCounterSelector: '.card__counter-likes',
  templateSelector: '#card-template',
  titleSelector: '.card__title',
}
const profileSettings = {
  aboutSelector: '.profile__about',
  avatarSelector: '.avatar',
  nameSelector: '.profile__name'
}; profileSettings
const validationSettings = {
  buttonDisabledClass: 'popup__save-button_disabled',
  buttonSelector: '.popup__save-button',
  errorClass: 'popup__error_visible',
  formSelector: '.popup__form',
  inputErrorClass: 'popup__input_type_error',
  inputSelector: '.popup__input'
}


// * functions: ascending

function createCard(item) {
  const card = new Card(
    item,
    currentUserId,
    cardSettings,
    cardPreviewPopup.open.bind(cardPreviewPopup),
    deleteCard,
    likeCard
  );
  const cardElement = card.createElement();
  return cardElement;
}

function deleteCard(card) {
  actionConfirmPopup.open(() => {
    api.deleteCardFromServer(card.getId())
      .then(() => {
        card.deleteCardElement();
        card = null;
        actionConfirmPopup.close();
      })
      .catch(err => {
        console.log(err);
      });
  });
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
      popupCardAdd.close();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      popupCardAdd.releaseBusyState();
    });
};

function setUserInfo(data) {
  const info = {
    name: data['profile-name'],
    about: data['profile-about']
  }
  api.patchUserInfo(info)
    .then(jsonResponseUser => {
      userInfo.setUserInfo(jsonResponseUser);
      popupProfileEdit.close();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      popupProfileEdit.releaseBusyState();
    });
};

function likeCard(card) {
  let isLiked;
  if (card.checkLikeOnLike()) {
    isLiked = true;
  } else {
    isLiked = false;
  }
  api.likeCard(card.getId(), isLiked)
    .then((item) => {
      card.toggleLike();
      card.setCounterLikes(item);
    })
    .catch(err => {
      console.log(err);
    });
}

function updateAvatar(data) {
  const info = {
    link: data['avatar-link'],
  }
  api.updateAvatar(info)
    .then(jsonResponseUser => {
      userInfo.setAvatar(jsonResponseUser);
      popupAvatarUpdate.close();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      popupAvatarUpdate.releaseBusyState();
    });
};

// * main code

// user info features
const userInfo = new UserInfo(profileSettings);

// adding card features
const popupCardAdd = new PopupWithForm('.popup_type_add-card', submitAddCardForm);
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
const popupProfileEdit = new PopupWithForm('.popup_type_edit-profile', setUserInfo);
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

// deleting card features
const actionConfirmPopup = new PopupWithConfirmation('.popup_type_confirm');
actionConfirmPopup.setEventListeners();


// showing photo features
const cardPreviewPopup = new PopupWithImage('.popup_type_show-photo');
cardPreviewPopup.setEventListeners();

// photo grid features
const photoGridList = new Section(
  item => {
    const cardElement = createCard(item);
    photoGridList.addItem(cardElement, false);
  },
  '.photo-grid__list'
);

// updating avatar features
const popupAvatarUpdate = new PopupWithForm('.popup_type_update-avatar', updateAvatar);
popupAvatarUpdate.setEventListeners();
const formElementAvatarUpdate = document.forms['update-avatar-form'];
const avatarLinkInput = formElementAvatarUpdate.querySelector('.input-field_name_avatar-link');
const formAvatarUpdateValidator = new FormValidator(validationSettings, formElementAvatarUpdate);
formAvatarUpdateValidator.enableValidation();
const buttonAvatarUpdate = document.querySelector('.profile__avatar-container');
buttonAvatarUpdate.addEventListener('click', () => {
  avatarLinkInput.value = '';
  formAvatarUpdateValidator.validateOnOpening();
  popupAvatarUpdate.open();
});


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
      userInfo.setInitialUserInfo(jsonResponseUser);
      photoGridList.generateAndAddInitialItems(jsonResponseCards);
    }
  )
  .catch(err => {
    console.log(err);
  });


// * set vars: pseudo-ascending order

// root vars derived from literals
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
const popupFormSelector = '.popup__form';
const popupOpenedClass = 'popup_opened';
const popupSelector = '.popup';

// root vars derived from document and literals
const addCardButton = document.querySelector('.add-button_type_card');
const addCardForm = document.forms['add-card-form'];
const addCardPopup = document.querySelector('.popup_type_add-card');
const closeButtons = document.querySelectorAll('.popup__close-button');
const editProfileButton = document.querySelector('.edit-button_type_profile');
const editProfileForm = document.forms['edit-profile-form'];
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const profileAbout = document.querySelector('.profile__about');
const photoGridList = document.querySelector('.photo-grid__list');
const profileName = document.querySelector('.profile__name');
const showPhotoPopup = document.querySelector('.popup_type_show-photo');

// root vars derived from addCardForm and literals
const cardTitleInput = addCardForm.querySelector('.input-field_name_card-title');
const cardPhotoLinkInput = addCardForm.querySelector('.input-field_name_card-photo-link');

// root vars derived from editProfileForm and literals
const profileAboutInput = editProfileForm.querySelector('.input-field_name_profile-about');
const profileNameInput = editProfileForm.querySelector('.input-field_name_profile-name');


// * define functions: ascending order

function addCard(cardTitle, cardLink, cardSettings, isPrepending = true) {
  const item = {
    name: cardTitle,
    link: cardLink
  };
  const card = new Card(item, cardSettings, openPopup);
  if (isPrepending) {
    photoGridList.prepend(card.generateCard());
  } else {
    photoGridList.append(card.generateCard());
  }
}

function addOverlayClickListeners(popupSelector) {
  const popupList = Array.from(document.querySelectorAll(popupSelector));
  popupList.forEach((popup) => {
    popup.addEventListener('click', (event) => {
      if (event.currentTarget === event.target) {
        closePopup(popup);
      }
    });
  });
}

function closePopup(popup) {
  popup.classList.remove(popupOpenedClass);
  document.removeEventListener('keyup', handleEscUp);
  formElement = popup.querySelector(popupFormSelector);
  if (formElement) {
    formElement.reset();
  }
}

function handleEscUp(event) {
  if (event.key === escKey) {
    const activePopup = document.querySelector('.' + popupOpenedClass);
    closePopup(activePopup);
  };
};

const openPopup = function (popup) {
  popup.classList.add(popupOpenedClass);
  document.addEventListener('keyup', handleEscUp);
};

function submitAddCardForm(event) {
  event.preventDefault();
  addCard(cardTitleInput.value, cardPhotoLinkInput.value, cardSettings);
  addCardForm.reset();
  closePopup(addCardPopup);
};

function submitEditProfileForm(event) {
  event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileAbout.textContent = profileAboutInput.value;
  closePopup(editProfilePopup);
};


// * define classes: ascending order

class Card {

  constructor(item, cardSettings, openPopup) {
    // set vars: pseudo-ascending order

    // root vars derived from parameters
    this._item = item;
    this._cardSettings = cardSettings;
    this._openPopup = openPopup;

    // root vars derived from document and this._cardSettings
    this._cardTemplate = document.querySelector(this._cardSettings.templateSelector).content.querySelector(this._cardSettings.itemSelector);
    this._showPhotoPopup = document.querySelector(this._cardSettings.showPhotoPopupSelector);

    // root vars derived from this._cardTemplate
    this._card = this._cardTemplate.cloneNode(true);

    // root vars derived from this._card and this._cardSettings
    this._deleteButton = this._card.querySelector(this._cardSettings.deleteButtonSelector);
    this._likeButton = this._card.querySelector(this._cardSettings.likeButtonSelector);
    this._photo = this._card.querySelector(this._cardSettings.photoSelector);
    this._title = this._card.querySelector(this._cardSettings.titleSelector);

    // root vars derived from this._showPhotoPopup and this._cardSettings
    this._fullPhoto = this._showPhotoPopup.querySelector(this._cardSettings.fullPhotoSelector);
    this._fullPhotoTitle = this._showPhotoPopup.querySelector(this._cardSettings.fullPhotoTitle);

    // this._photo properties derived from this._item
    this._photo.alt = this._item.name;
    this._photo.src = this._item.link;

    // this._title properties derived from this._item
    this._title.textContent = this._item.name;


    // main code
    this._photo.classList.add(this._cardSettings.interactiveElementClass);
    this._setEventListeners();
  }


  // private methods: ascending order

  _handleLikedCard() {
    this._likeButton.addEventListener('click', (event) => {
      event.target.classList.toggle(this._cardSettings.likeButtonLikedClass);
    });
  }

  _handleRemoveCard() {
    this._deleteButton.addEventListener('click', () => {
      this._card.remove();
    });
  }

  _handleShowPhoto() {
    this._photo.addEventListener('click', () => {
      this._fullPhoto.src = this._item.link;
      this._fullPhoto.alt = this._item.name;
      this._fullPhotoTitle.textContent = this._item.name;
      this._openPopup(this._showPhotoPopup);
    });
  }

  _setEventListeners() {
    this._handleLikedCard();
    this._handleRemoveCard();
    this._handleShowPhoto();
  }


  // public methods: ascending order

  generateCard() {
    return this._card;
  }

}


// * main code

// add initial cards
initialCards.forEach(item => {
  addCard(item.name, item.link, cardSettings, false);
});


// add event listeners

addCardButton.addEventListener('click', () => {
  openPopup(addCardPopup);
});

addCardForm.addEventListener('submit', submitAddCardForm);

addOverlayClickListeners(popupSelector);

closeButtons.forEach((button) => {
  const popup = button.closest(popupSelector);
  button.addEventListener('click', () => closePopup(popup));
});

editProfileButton.addEventListener('click', () => {
  openPopup(editProfilePopup);
  profileNameInput.value = profileName.textContent;
  profileAboutInput.value = profileAbout.textContent;
});

editProfileForm.addEventListener('submit', submitEditProfileForm);

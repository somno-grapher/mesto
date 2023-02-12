// * vars: pseudo-ascending order

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


// * functions: ascending order

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

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  saveButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}


// implement validation

const addCardFormValidator = new FormValidator(validationSettings, addCardForm);
addCardButton.addEventListener('click', () => {
  addCardFormValidator.validateOnOpening();
});
addCardFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator(validationSettings, editProfileForm);
editProfileButton.addEventListener('click', () => {
  editProfileFormValidator.validateOnOpening();
});
editProfileFormValidator.enableValidation();

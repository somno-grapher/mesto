// * vars: scope descending then alphabeticaly ascending

// abstract scope
const cardPhotoSelector = '.card__photo';
const cardTitleSelector = '.card__title';
const deleteButtonSelector = '.delete-button';
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
const interactiveElementClass = 'mix-interactive-element';
const likeButtonLikedClass = 'like-button_liked';
const likeButtonSelector = '.like-button';
const popupFormSelector = '.popup__form';
const popupOpenedClass = 'popup_opened';
const popupSelector = '.popup';

// document scope
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

// photoGridList scope
// ! .querySelector('.card') is important
const cardTemplate = photoGridList.querySelector('#card-template').content.querySelector('.card');

// addCardForm scope
const cardTitleInput = addCardForm.querySelector('.input-field_name_card-title');
const cardPhotoLinkInput = addCardForm.querySelector('.input-field_name_card-photo-link');

// editProfileForm scope
const profileAboutInput = editProfileForm.querySelector('.input-field_name_profile-about');
const profileNameInput = editProfileForm.querySelector('.input-field_name_profile-name');

// showPhotoPopup scope
const fullPhoto = showPhotoPopup.querySelector('.full-photo');
const fullPhotoTitle = showPhotoPopup.querySelector('.popup__title');


// * functions: ascending order

function addCard(cardTitle, cardLink, isPrepending = true) {
  const item = {
    name: cardTitle,
    link: cardLink
  };
  const card = createCard(item);
  if (isPrepending) {
    photoGridList.prepend(card);
  } else {
    photoGridList.append(card);
  }
}

function closePopup(popup) {
  popup.classList.remove(popupOpenedClass);
  document.removeEventListener('keyup', handleEscUp);
  popup.querySelector(popupFormSelector).reset();
}

function createCard(item) {
  const card = cardTemplate.cloneNode(true);
  const deleteButton = card.querySelector(deleteButtonSelector);
  const likeButton = card.querySelector(likeButtonSelector);
  const photo = card.querySelector(cardPhotoSelector);
  const title = card.querySelector(cardTitleSelector);
  photo.alt = item.name;
  photo.classList.add(interactiveElementClass);
  photo.src = item.link;
  title.textContent = item.name;
  deleteButton.addEventListener('click', () => {
    card.remove();
  });
  likeButton.addEventListener('click', (event) => {
    event.target.classList.toggle(likeButtonLikedClass);
  });
  photo.addEventListener('click', () => {
    fullPhoto.src = item.link;
    fullPhoto.alt = item.name;
    fullPhotoTitle.textContent = item.name;
    openPopup(showPhotoPopup);
  });
  return card;
}

function handleEscUp(event) {
  if (event.key === escKey) {
    const activePopup = document.querySelector('.' + popupOpenedClass);
    closePopup(activePopup);
  };
};

function openPopup(popup) {
  popup.classList.add(popupOpenedClass);
  document.addEventListener('keyup', handleEscUp);
};

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

function submitAddCardForm(event) {
  event.preventDefault();
  addCard(cardTitleInput.value, cardPhotoLinkInput.value);
  addCardForm.reset();
  closePopup(addCardPopup);
};

function submitEditProfileForm(event) {
  event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileAbout.textContent = profileAboutInput.value;
  closePopup(editProfilePopup);
};


// * event listeners: ascending order

addCardButton.addEventListener('click', () => {
  openPopup(addCardPopup);
  validateFormOnOpening(addCardForm, validationSettings.inputErrorClass, validationSettings.errorClass, validationSettings.inputSelector, validationSettings.saveButtonSelector, validationSettings.inactiveButtonClass);
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
  validateFormOnOpening(editProfileForm, validationSettings.inputErrorClass, validationSettings.errorClass, validationSettings.inputSelector, validationSettings.saveButtonSelector, validationSettings.inactiveButtonClass);
});

editProfileForm.addEventListener('submit', submitEditProfileForm);


// * main code

// insert initial cards
initialCards.forEach(item => {
  addCard(item.name, item.link, false);
});

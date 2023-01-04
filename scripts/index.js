// * vars: scope descending then alphabeticaly ascending

// abstract scope
const cardPhotoQuerySelector = '.card__photo';
const cardTitleQuerySelector = '.card__title';
const deleteButtonQuerySelector = '.delete-button';
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
const likeButtonQuerySelector = '.like-button';
const likeButtonActiveClass = 'like-button_active';
const popupOpenedClass = 'popup_opened';

// document scope
const addButtonTypeCard = document.querySelector('.add-button_type_card');
const editButtonTypeProfile = document.querySelector('.edit-button_type_profile');
const photoGridList = document.querySelector('.photo-grid__list');
const popupTypeAddCard = document.querySelector('.popup_type_add-card');
const popupTypeEditProfile = document.querySelector('.popup_type_edit-profile');
const popupTypePhoto = document.querySelector('.popup_type_photo');
const profileAbout = document.querySelector('.profile__about');
const profileName = document.querySelector('.profile__name');

// photoGridList scope
// .querySelector('.card') is important
const cardTemplate = photoGridList.querySelector('#card-template').content.querySelector('.card');

// popupTypeAddCard scope
const popupTypeAddCardCloseButton = popupTypeAddCard.querySelector('.popup__close-button');
const popupTypeAddCardForm = popupTypeAddCard.querySelector('.popup__form');

// popupTypeAddCardForm scope
const inputFieldNameCardTitle = popupTypeAddCardForm.querySelector('.input-field_name_card-title');
const inputFieldNameCardPhotoLink = popupTypeAddCardForm.querySelector('.input-field_name_card-photo-link');

// popupTypeEditProfile scope
const popupTypeEditProfileCloseButton = popupTypeEditProfile.querySelector('.popup__close-button');
const popupTypeEditProfileForm = popupTypeEditProfile.querySelector('.popup__form');

// popupTypeEditProfileForm scope
const inputFieldNameProfileAbout = popupTypeEditProfileForm.querySelector('.input-field_name_profile-about');
const inputFieldNameProfileName = popupTypeEditProfileForm.querySelector('.input-field_name_profile-name');

// popupTypePhoto scope
const largePhoto = popupTypePhoto.querySelector('.large-photo');
const popupTypePhotoTitle = popupTypePhoto.querySelector('.popup__title');
const popupTypePhotoCloseButton = popupTypePhoto.querySelector('.popup__close-button');


// * functions: ascending order

function addCard(cardTitle, cardLink, prepend = true) {
  const item = {
    name: cardTitle,
    link: cardLink
  };
  const card = createCard(item);
  if (prepend) {
    photoGridList.prepend(card);
  } else {
    photoGridList.append(card);
  }
}

function closePopup(popup) {
  popup.classList.remove(popupOpenedClass);
}

function createCard(item) {
  const card = cardTemplate.cloneNode(true);
  const deleteButton = card.querySelector(deleteButtonQuerySelector);
  const likeButton = card.querySelector(likeButtonQuerySelector);
  const photo = card.querySelector(cardPhotoQuerySelector);
  const title = card.querySelector(cardTitleQuerySelector);
  photo.alt = item.name;
  photo.classList.add(interactiveElementClass);
  photo.src = item.link;
  title.textContent = item.name;
  deleteButton.addEventListener('click', () => {
    card.remove();
  });
  likeButton.addEventListener('click', (event) => {
    event.target.classList.toggle(likeButtonActiveClass);
  });
  photo.addEventListener('click', () => {
    largePhoto.src = item.link;
    largePhoto.alt = item.name;
    popupTypePhotoTitle.textContent = item.name;
    openPopup(popupTypePhoto);
  });
  return card;
}

function handlePopupTypeAddCardFormSubmit(event) {
  event.preventDefault();
  addCard(inputFieldNameCardTitle.value, inputFieldNameCardPhotoLink.value);
  popupTypeAddCardForm.reset();
  closePopup(popupTypeAddCard);
}

function handlePopupTypeEditProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = inputFieldNameProfileName.value;
  profileAbout.textContent = inputFieldNameProfileAbout.value;
  closePopup(popupTypeEditProfile);
}

function openPopup(popup) {
  popup.classList.add(popupOpenedClass);
}


// * event listeners: ascending order

addButtonTypeCard.addEventListener('click', () => {
  openPopup(popupTypeAddCard);

  // optional default values
  const initialCardsRandomIndex = Math.floor(Math.random() * initialCards.length);
  inputFieldNameCardTitle.value = initialCards[initialCardsRandomIndex].name;
  inputFieldNameCardPhotoLink.value = initialCards[initialCardsRandomIndex].link;

});

editButtonTypeProfile.addEventListener('click', () => {
  openPopup(popupTypeEditProfile);
  inputFieldNameProfileName.value = profileName.textContent;
  inputFieldNameProfileAbout.value = profileAbout.textContent;
});

popupTypeAddCardCloseButton.addEventListener('click', () => {
  closePopup(popupTypeAddCard);
});

popupTypeEditProfileCloseButton.addEventListener('click', () => {
  closePopup(popupTypeEditProfile);
});

popupTypeAddCardForm.addEventListener('submit', handlePopupTypeAddCardFormSubmit);

popupTypeEditProfileForm.addEventListener('submit', handlePopupTypeEditProfileFormSubmit);

popupTypePhotoCloseButton.addEventListener('click', () => {
  closePopup(popupTypePhoto);
});


// * main code

// insert initial cards
initialCards.forEach(item => {
  addCard(item.name, item.link, false);
});

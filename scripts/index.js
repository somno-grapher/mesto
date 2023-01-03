// * consts and vars: scope descending then alphabeticaly ascending

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
const cardTitleQuerySelector = '.card__title';
const cardPhotoQuerySelector = '.card__photo';

//document scope
const addCardPopup = document.querySelector('.popup_type_add-card');
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const photoGridList = document.querySelector('.photo-grid__list');
const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
let profileAbout = document.querySelector('.profile__about');
let profileName = document.querySelector('.profile__name');

// addCardPopup scope
const addCardPopupCloseButton = addCardPopup.querySelector('.popup__close-button');

// photoGridList scope
// TODO: check .querySelector('.card')
const cardTemplate = photoGridList.querySelector('#card-template').content.querySelector('.card');

// editProfilePopup scope
const editProfilePopupCloseButton = editProfilePopup.querySelector('.popup__close-button');
const editProfilePopupForm = editProfilePopup.querySelector('.popup__container');

// editProfilePopupForm scope
let editProfilePopupAboutInput = editProfilePopupForm.querySelector('.input-field_name_profile-about');
let editProfilePopupNameInput = editProfilePopupForm.querySelector('.input-field_name_profile-name');


// * functions: ascending order

function addCard(container, template, titleQuerySelector, photoQuerySelector, title, link) {
  // create card
  const card = template.cloneNode(true);
  card.querySelector(titleQuerySelector).textContent = title;
  card.querySelector(photoQuerySelector).src = link;
  // insert card
  container.append(card);
  return card;
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function handleEditProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = editProfilePopupNameInput.value;
  profileAbout.textContent = editProfilePopupAboutInput.value;
  closePopup(editProfilePopup);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}


// * event listeners: ascending order

addCardPopupCloseButton.addEventListener('click', () => {
  closePopup(addCardPopup);
});

editProfilePopupCloseButton.addEventListener('click', () => {
  closePopup(editProfilePopup);
});

editProfilePopupForm.addEventListener('submit', handleEditProfileFormSubmit);

profileAddButton.addEventListener('click', () => {
  openPopup(addCardPopup);
});

profileEditButton.addEventListener('click', () => {
  openPopup(editProfilePopup);
  editProfilePopupNameInput.value = profileName.textContent;
  editProfilePopupAboutInput.value = profileAbout.textContent;
});


// * main code

// insert initial cards
initialCards.forEach(item => {
  addCard(photoGridList, cardTemplate, cardTitleQuerySelector, cardPhotoQuerySelector, item.name, item.link);
});

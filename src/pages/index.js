import '../styles/index.css';

import { Card } from '../js/Card.js';
import { FormValidator } from '../js/FormValidator.js';
import { Section } from '../js/Section.js';
import PopupWithImage from '../js/PopupWithImage.js';
import PopupWithForm from '../js/PopupWithForm.js';
import UserInfo from '../js/UserInfo.js';
// Задан массив карточек
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

const formValidationOptionsNew = { //Задан массив настроек для валидации форм
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

// Определение объектов в DOM необходимых для работы 
const addButton = document.querySelector('.profile__add-button');
const popupFormPlace = document.forms.popup_place_form;
const popupFormAuthor = document.forms.popup_author_form;
const editButton = document.querySelector('.profile__info-edit-button');
const buttonSaveAuthor = popupFormAuthor.querySelector('.popup__button-save');
const userName = popupFormAuthor.elements.author;
const metier = popupFormAuthor.elements.metier;

// Создание экземпляров классов для работы
const formValidatorAuthor = new FormValidator(formValidationOptionsNew, popupFormAuthor);
const formValidatorPlace = new FormValidator(formValidationOptionsNew, popupFormPlace);
const newAuthorData = new UserInfo('.profile__info-title', '.profile__info-subtitle');

const popupAddAuthor = new PopupWithForm('#popup-author', {
    handleFormSubmit: (item) => {
        newAuthorData.setUserInfo(item.author, item.metier);
    }
});

const cardList = new Section({ //создаем экземляр класса для отрисовки элементов
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item.name, item.link, '#card', {
            handleCardClick: (evt) => { //callback функция, задающая параметры поведения окна при открытии (View)
                const popupImg = new PopupWithImage('#popup-view');
                popupImg.setEventListeners(); //Навешиваем слушатели закрытия при открытом окне
                popupImg.open(evt);
            }
        });
        const cardElement = card.createNewCard();
        cardList.addItem(cardElement);
    }
}, '.gallery');

const popupAddPlace = new PopupWithForm('#popup-place', {
    handleFormSubmit: (item) => {
        const newCard = new Card(item.place, item.url, '#card', {
            handleCardClick: (evt) => {
                const popupImg = new PopupWithImage('#popup-view');
                popupImg.setEventListeners();
                popupImg.open(evt);
            }
        });

        const newCardElement = newCard.createNewCard();
        cardList.addNewItem(newCardElement);

    }
});
// Выполняемый код на основе классов
formValidatorAuthor.enableValidation();
formValidatorPlace.enableValidation();
cardList.renderItems();
popupAddPlace.setEventListeners();
popupAddAuthor.setEventListeners();
addButton.addEventListener('click', () => {
    formValidatorPlace.enableValidation(); //Корректно устанавливается состояние кнопки
    popupAddPlace.open();
    formValidatorPlace.resetErrors(); //Сбрасываем ошибки с предыдущих открытий окна
});
editButton.addEventListener('click', () => {
    const authorInfo = newAuthorData.getUserInfo();
    userName.value = authorInfo.name;
    metier.value = authorInfo.metier;
    formValidatorAuthor.enableValidation(); //Корректно устанавливается состояние кнопки
    popupAddAuthor.open();
    formValidatorAuthor.resetErrors(); //Сбрасываем ошибки с предыдущих открытий окна
});

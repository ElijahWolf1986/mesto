import '../styles/index.css';
import { Card } from '../js/Card.js';
import { FormValidator } from '../js/FormValidator.js';
import { Section } from '../js/Section.js';
import PopupWithImage from '../js/PopupWithImage.js';
import PopupWithForm from '../js/PopupWithForm.js';
import UserInfo from '../js/UserInfo.js';
import PopupWithDelete from '../js/PopupWithDelete.js'
import Api from '../js/Api.js';

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
const popupFormAvatar = document.forms.popup_avatar;
const editButton = document.querySelector('.profile__info-edit-button');
const editAvatarButton = document.querySelector('.profile__edit');
const avatar = document.querySelector('.profile__avatar');
const userName = popupFormAuthor.elements.author;
const metier = popupFormAuthor.elements.metier;
const newCardPlace = document.querySelector('.gallery');

// Создание конфигурации для api что дано нам от бэкенда
const configApi = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-13',
    headers: {
        Authorization: '54672975-eeab-4137-bd8f-7cd077a45ce9',
        'Content-Type': 'application/json'
    }
};

// Создание экземпляров классов для работы
const formValidatorAuthor = new FormValidator(formValidationOptionsNew, popupFormAuthor);
const formValidatorPlace = new FormValidator(formValidationOptionsNew, popupFormPlace);
const formValidatorAvatar = new FormValidator(formValidationOptionsNew, popupFormAvatar);
const newAuthorData = new UserInfo('.profile__info-title', '.profile__info-subtitle');
const api = new Api(configApi); // Создание экземпляра api

const renderPage = res => { //Функция рендера карточек на странице
    const cardList = new Section({
        items: res,
        renderer: (item) => {
            const card = new Card(item, '#card', {
                handleCardClick: (evt) => {
                    const popupImg = new PopupWithImage('#popup-view');
                    popupImg.setEventListeners();
                    popupImg.open(evt);
                }
            },
                {
                    handleCardDelete: (id, container) => {
                        popupAsk.setEventListeners(id, container);
                        popupAsk.open();
                    }
                },
                {
                    handleCardLike: (id, heart, status, likesCounter) => {
                        if (!status) {
                            api.setLike(id)
                                .then((res) => {
                                    heart.classList.add('card__like_state_active');
                                    likesCounter.textContent = res.likes.length;

                                })
                        } else {
                            api.delLike(id)
                                .then((res) => {
                                    heart.classList.remove('card__like_state_active');
                                    likesCounter.textContent = res.likes.length;
                                })
                        }
                    }
                }
            );
            const cardElement = card.createNewCard();
            cardList.addItem(cardElement);
        }
    }, '.gallery');
    cardList.renderItems();
};

const popupAddAuthor = new PopupWithForm('#popup-author', { // Изменение данных о пользователе
    handleFormSubmit: (item) => {
        popupAddAuthor.setButtonState('Сохранение...');
        api.setUserInfo(item.author, item.metier)
            .then((res) => {
                newAuthorData.setUserInfo(res.name, res.about);
            })
            .then(() => {
                popupAddAuthor.close()
                popupAddAuthor.setButtonState('Сохранить');
            })

            .catch((err) => {
                console.log(`Ошибка загрузки данных на сервер... ${err}`);
                popupAddAuthor.setButtonState('Изменить настройки не удалось..');
            })
    }
});

const popupAddPlace = new PopupWithForm('#popup-place', { // Работа попапа добавления карточки
    handleFormSubmit: (item) => {
        popupAddPlace.setButtonState('Сохранение...');
        api.setNewCard(item.place, item.url)
            .then(newCardHandle)
            .then(() => {
                popupAddPlace.close();
                popupAddPlace.setButtonState('Создать');
            })
            .catch((err) => {
                console.log(`Ошибка загрузки карты на сервер... ${err}`);
                popupAddPlace.setButtonState('Не удалось сохранить :(');
            })
    }
})

const changeAvatar = res => { // Функция записи аватара в DOM
    avatar.src = res.avatar;
}

const popupAddAvatar = new PopupWithForm('#popup-avatar', { // Работа попапа добавления аватара
    handleFormSubmit: (item) => {
        popupAddAvatar.setButtonState('Сохранение...');
        api.setAvatar(item.url)
            .then(changeAvatar)
            .then(() => {
                popupAddAvatar.close()
                popupAddAvatar.setButtonState('Сохранить');
            })
            .catch((err) => {
                console.log(`Ошибка загрузки карты на сервер... ${err}`);
                popupAddAvatar.setButtonState('Аватар не удалось сохранить :(');
            })
    }
})

const popupAsk = new PopupWithDelete('#popup-delete', { // Работа попапа удаления карточки
    handleFormDelete: (id, container) => {
        popupAsk.setButtonState('Удаление...');
        api.deleteCard(id)
            .then(() => {
                container.remove();
                popupAsk.setButtonState('Да');
                popupAsk.close();
            })
            .catch((err) => {
                console.log(`Ошибка соединения с сервером... ${err}`);
                popupAsk.setButtonState('Карту удалить не удалось :(');
            })
    }
});

const newCardHandle = res => {  // Функция создание пользовательской карточки
    const newCard = new Card(res, '#card', {
        handleCardClick: (evt) => {
            const popupImg = new PopupWithImage('#popup-view');
            popupImg.setEventListeners();
            popupImg.open(evt);
        }
    }, {
        handleCardDelete: (id, container) => {
            popupAsk.setEventListeners(id, container);
            popupAsk.open();
        }
    }, {
        handleCardLike: (id, heart, status, likesCounter) => {
            if (!status) {
                api.setLike(id)
                    .then((res) => {
                        heart.classList.add('card__like_state_active');
                        likesCounter.textContent = res.likes.length;
                    })
            } else {
                api.delLike(id)
                    .then((res) => {
                        heart.classList.remove('card__like_state_active');
                        likesCounter.textContent = res.likes.length;
                    })
            }
        }
    })
    const newCardElement = newCard.createNewCard();
    newCardPlace.prepend(newCardElement);
}

// Выполняемый код на основе классов
api.getUserInfo() // Получение данных о пользователе с сервера и отображение
    .then((res) => {
        newAuthorData.setUserInfo(res.name, res.about);
        avatar.src = res.avatar;
    })
    .catch((err) => {
        console.log(`Ошибка загрузки данных с сервера... ${err}`);
    })


api.getInitialCards() //Рендерим карточки после запроса на сервер
    .then(renderPage)
    .catch((err) => {
        console.log(`Ошибка загрузки данных с сервера... ${err}`);
    })

popupAddPlace.setEventListeners();
popupAddAuthor.setEventListeners();
popupAddAvatar.setEventListeners();

addButton.addEventListener('click', () => {
    formValidatorPlace.enableValidation();
    popupAddPlace.open();
    formValidatorPlace.resetErrors();

});
editButton.addEventListener('click', () => {
    const authorInfo = newAuthorData.getUserInfo();
    userName.value = authorInfo.name;
    metier.value = authorInfo.metier;
    formValidatorAuthor.enableValidation();
    popupAddAuthor.open();
    formValidatorAuthor.resetErrors();
});

editAvatarButton.addEventListener('click', () => {
    formValidatorAvatar.enableValidation();
    popupAddAvatar.open();
    formValidatorAvatar.resetErrors();

});

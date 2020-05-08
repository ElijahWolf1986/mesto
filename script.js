const saveButton = document.querySelector('.popup__button-save'); //Находим в DOM кнопку "сохранить" элемента popup
const editButton = document.querySelector('.profile__info-edit-button'); //Находим в DOM кнопку "внести изменения" 
const closeButton = document.querySelector('.popup__close-icon'); //Находим в DOM кнопку закрыть элемента popup
const popup = document.querySelector('.popup'); //Находим в DOM элемент popup которому будем добавлять или убирать дополнительный класс
let profileUserName = document.querySelector('.profile__info-title'); //Находим в DOM элемент-заголовок который будем менять (имя)
let profileMetier = document.querySelector('.profile__info-subtitle'); //Находим в DOM элемент-текстовое поле который будем менять (род занятий)
let popupForm = document.forms.popup; //Находим в DOM нашу формудля заполнения данных
let userName = popupForm.elements.author; //Находим в DOM поле заполнения имен
let metier = popupForm.elements.metier; //Находим в DOM поле заполнения рода занятий

//Работа кнопки "внести изменения"
editButton.addEventListener('click', function () {
    popup.classList.add('popup_state_opened');

});
//Работа кнопки "закрыть" - без внесения изменений
closeButton.addEventListener('click', function () {
    popup.classList.remove('popup_state_opened');

});
//Работа кнопки "сохранить" - с внесение изменений
saveButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    profileUserName.textContent = userName.value; 
    profileMetier.textContent = metier.value;
    popup.classList.remove('popup_state_opened'); //закрываем popup контейнер
});



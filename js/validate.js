

/* const formValidationOptions = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }
enableValidation(formValidationOptions); */

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid; 
    });
};

function toggleButtonState(inputList, buttonElement) {
    if(hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__button-save_disabled');
        buttonElement.setAttribute('disabled', true);

    } else {
        buttonElement.classList.remove('popup__button-save_disabled');
        buttonElement.removeAttribute('disabled');

    }
};

function showInputError (formElement, inputElement, errorMessage) { //Функция выводит ошибку при заполнении формы
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__error_visible');
};

function hideInputError (formElement, inputElement) { // Функция убирает ошибку при заполнении формы
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__error_visible');
    errorElement.textContent = '';
};

function isValid (formElement, inputElement) { //Функция проверяет наличие ошибки при заполнении формы
    if(!inputElement.validity.valid) {
        showInputError (formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError (formElement, inputElement);
    }
};

function setEventListeners (formElement) { //Функция добавляет слушатели к полям инпут формы
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button-save');
    toggleButtonState (inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement); 
        toggleButtonState (inputList, buttonElement)});
    });
};


function enableValidation () { //Функция добавляет слушатели ко всем формам на сайте
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners (formElement);
    });
};





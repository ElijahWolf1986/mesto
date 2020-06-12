
function hasInvalidInput(inputList) {//Функция проверяет все ли формы прошли проверку на валидность
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid; 
    });
};

function toggleButtonState(inputList, buttonElement) { //Функция переключает статус кнопок а зависимости от работы ф-ции hasInvalidInput
    if(hasInvalidInput(inputList)) {
        buttonElement.classList.add(formValidationOptions.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);

    } else {
        buttonElement.classList.remove(formValidationOptions.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');

    }
};

function showInputError (formElement, inputElement, errorMessage) { //Функция выводит ошибку при заполнении формы
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(formValidationOptions.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(formValidationOptions.errorClass);
};

function hideInputError (formElement, inputElement) { // Функция убирает ошибку при заполнении формы
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(formValidationOptions.inputErrorClass);
    errorElement.classList.remove(formValidationOptions.errorClass);
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
    const inputList = Array.from(formElement.querySelectorAll(formValidationOptions.inputSelector));
    const buttonElement = formElement.querySelector(formValidationOptions.submitButtonSelector);
    toggleButtonState (inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement); 
        toggleButtonState (inputList, buttonElement)});
    });
};

function enableValidation (options) { //Функция добавляет слушатели ко всем формам на сайте
    const formList = Array.from(document.querySelectorAll(formValidationOptions.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners (formElement);
    });
};


function hasInvalidInput(inputList) {//Функция проверяет все ли формы прошли проверку на валидность
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

function toggleButtonState(options, inputList, buttonElement) { //Функция переключает статус кнопок а зависимости от работы ф-ции hasInvalidInput
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(options.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);

    } else {
        buttonElement.classList.remove(options.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');

    }
}

function showInputError(options, formElement, inputElement, errorMessage) { //Функция выводит ошибку при заполнении формы
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(options.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(options.errorClass);
}

function hideInputError(options, formElement, inputElement) { // Функция убирает ошибку при заполнении формы
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(options.inputErrorClass);
    errorElement.classList.remove(options.errorClass);
    errorElement.textContent = '';
}

function isValid(options, formElement, inputElement) { //Функция проверяет наличие ошибки при заполнении формы
    if (!inputElement.validity.valid) {
        showInputError(options, formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(options, formElement, inputElement);
    }
}

function setEventListeners(options, formElement) { //Функция добавляет слушатели к полям инпут формы
    const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
    const buttonElement = formElement.querySelector(options.submitButtonSelector);
    toggleButtonState(options, inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(options, formElement, inputElement);
            toggleButtonState(options, inputList, buttonElement)
        });
    });
}

function enableValidation(options) { //Функция добавляет слушатели ко всем формам на сайте
    const formList = Array.from(document.querySelectorAll(options.formSelector));
    // console.log(formList);
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(options, formElement);
    });
}



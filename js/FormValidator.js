export class FormValidator {
    constructor(options, formElement) {
        this._options = options;
        this._formElement = formElement;
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _disableButtonState(buttonElement) {
        buttonElement.classList.add(this._options.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    }

    enableButtonState(buttonElement) {
        buttonElement.classList.remove(this._options.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            this._disableButtonState(buttonElement);
        } else {
            this.enableButtonState(buttonElement);

        }
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._options.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._options.errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._options.inputErrorClass);
        errorElement.classList.remove(this._options.errorClass);
        errorElement.textContent = '';
    }

    _isValid(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    enableValidation() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._options.inputSelector));
        const buttonElement = this._formElement.querySelector(this._options.submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._toggleButtonState(inputList, buttonElement)
            });
        });
    }

}















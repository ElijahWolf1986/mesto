// Класс отвечающий за всплывающие окна с формами взаимодействия с пользователем
// Имеет функцию колбэк, определяющую способ взаимодействия с данными и работу кнопки submit
// Для каждого типа взаимодейсвий можно написать свою функцию

import { Popup } from './Popup.js';

export default class PopupWhithForm extends Popup {
    constructor(containerSelector, { handleFormSubmit }) {
        super(containerSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._container = document.querySelector(containerSelector);
        
    }

    _getInputValues() {
        this._inputList = this._container.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._container.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();

        });
    }

    _setInputValuesEmpty() {
        this._inputList = this._container.querySelectorAll('.popup__input');
        this._inputList.forEach(input => {
            input.value = '';
            
        });
    }

    close() {
        super.close();
        this._setInputValuesEmpty();
    }

}

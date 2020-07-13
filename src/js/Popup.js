// Класс родоначальник всплывающих окон на странице
// Включает в себя базовые свойства всех всплывающих окон: открытие, закрытие и слушатели

export class Popup {
    constructor(containerSelector) {
        this._container = document.querySelector(containerSelector);
    }

    open() {
        this._container.classList.add('popup_state_opened');
    }

    close() {
        this._container.classList.remove('popup_state_opened');
        this._removeEventListeners();
    }

    _handleEscClose(evt) {
        const openedPopup = document.querySelector('.popup_state_opened');
        if (evt.key === 'Escape' && (openedPopup)) {
            this.close();
        }
    }

    setEventListeners() {
        const closeButton = this._container.querySelector('.popup__close-icon');
        const overlay = this._container.querySelector('.popup__overlay');
        overlay.addEventListener('click', () => this.close());
        closeButton.addEventListener('click', () => this.close()); 
        document.addEventListener('keydown', (evt) => this._handleEscClose(evt)); 

    }

    _removeEventListeners() {
        document.removeEventListener('keydown', this._handleEscClose.bind(Popup));
    }


}


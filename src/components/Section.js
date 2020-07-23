// Класс отвечает за отрисовку элементов на странице пользователя 
// Не имеет своей разметки, получая ее в колбэке renderer
// gallerySelector - селектор контейнера в котором отрисовываются элементы

export class Section {
    constructor({items, renderer}, gallerySelector) {
        this._items = items;
        this._renderer = renderer;
        this._gallery = document.querySelector(gallerySelector);

    }

    renderItems() {
        this._items.forEach((item) => {
            this._renderer(item);
        });

    }

    addItem(element) {
        this._gallery.append(element);
        // Способ добавления элемента в конец списка
    }

    addNewItem(element) {
        this._gallery.prepend(element);
        // Способ добавления элемента в начало списка
    }

}
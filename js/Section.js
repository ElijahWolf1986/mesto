
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

    }

    addNewItem(element) {
        this._gallery.prepend(element);
    }

}
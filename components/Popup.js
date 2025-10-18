export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popupElement.querySelector(".popup__close");
  }

  _handleEscapeClose(evt) {
    if (evt.key === "Escape" || evt.keyCode === 27) {
      this.close();
    }
  }

  open() {
    this._popupElement.classList.add("popup_visible");
    document.addEventListener("keydown", (evt) => {
      this._handleEscapeClose(evt);
    });
  }

  close() {
    this._popupElement.classList.remove("popup_visible");
    document.removeEventListener("keydown", (evt) => {
      this._handleEscapeClose(evt);
    });
  }

  setEventListeners() {
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (
        evt.target.className.includes("popup_visible") |
        evt.target.className.includes("popup__close")
      ) {
        this.close();
        console.log("pop");
      }
    });
  }
}

import React from 'react';

function PopupWithForm({children, type, title, buttonText, isOpened, onPopupClose,}) {
  return (
    <div className={`popup popup_type_${type} ${isOpened  ? "popup_opened" : ""}`} id="add-popup">
      <div className="popup__content">
        <h3 className="popup__title">{title}</h3>
        <button type="button" className="popup__close" onClick={onPopupClose}/>
        <form className="popup__form" name={type}>
          {children}
          <button className="popup__button" type="submit">{buttonText || "Сохранить"}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;








// import Popup from './Popup.js'

// export default class PopupWithForm extends Popup {
//   constructor(popupSelector, { handleFormSubmit }) {
//     super(popupSelector);
//     this._handleFormSubmit = handleFormSubmit;
//     this._popupForm = this._popup.querySelector('.popup__form');
//     this._inputList = this._popup.querySelectorAll('.popup__input');
//     this._saveButton = this._popupForm.querySelector('.popup__button')
//   }

//   _getInputValues() { //функция возвращает объект _formValues
//     this._formValues = {};

//     this._inputList.forEach((input) => {
//       this._formValues[input.name] = input.value;
//     })

//     return this._formValues;
//   }

//   close() {
//     super.close(); // вызывается метод из родительского класса
//     this._popupForm.reset();
//   }

//   changeButtonText(text) {
//     this._saveButton.textContent = text;
//   }

//   setEventListeners() {
//     super.setEventListeners() // вызывается метод из родительского класса
//     this._popupForm.addEventListener('submit', (evt) => { // вешаются обработчики
//         evt.preventDefault();

//         this._handleFormSubmit(this._getInputValues()) // аргументом принимается объект из _getInputValues
//     });
//   }
// }
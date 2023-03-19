import React from 'react';

function PopupWithImage({card, onPopupClose}) {
  return (
  <div className={`popup popup_type_pic ${card.link ? "popup_opened" : " "}`}>
    <figure className="popup__pic-box">
      <img src={card.link} alt={card.name} className="popup__image" />
      <figcaption className="popup__caption">{card.name}</figcaption>
      <button type="button" className="popup__close" onClick={onPopupClose} />
    </figure>
  </div>
  )
}

export default PopupWithImage;




// import Popup from './Popup.js'

// export default class PopupWithImage extends Popup {
//   constructor(popupSelector) {
//     super(popupSelector);
//     this._popupImage = this._popup.querySelector('.popup__image')
//     this._popupCaption = this._popup.querySelector('.popup__caption')
//   }

//   open(name, link) {
//     super.open(); // вызывается метод из родительского класса
//     this._popupImage.src = link;
//     this._popupImage.alt = name;
//     this._popupCaption.textContent = name;
//   }
// }
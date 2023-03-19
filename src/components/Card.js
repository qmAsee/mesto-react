import React from 'react';

function Card(card) {
  
  function handleCardClick() {
    card.onCardClick(card)
  }


  return (
    <li className="card">
    <button type="button" className="card__trash" />
    <img className="card__image" src={card.link} alt={card.name} onClick={handleCardClick} />
    <div className="card__wrapper">
      <h2 className="card__title">{card.name}</h2>
      <div className="card__container">
        <button type="button" className="card__like">
        </button>
        <span className="card__calc">{card.likes.length}</span>
      </div>
    </div>
  </li>
  );
}

export default Card;
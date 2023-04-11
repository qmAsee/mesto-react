import React, { useState, useEffect} from 'react';
import Card  from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import { api } from '../utils/Api.js';

function Main({cards, onAddCard, onEditProfile, onEditAvatar, onCardClick, onCardLike, onCardDelete}) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
          <main>
            <section className="profile">
              <div className="profile__box">
                <img src={currentUser.avatar} alt="аватар" className="profile__image" />
                <button type="button" className="profile__overlay" onClick={() => {
                    onEditAvatar(true)
                }} />
              </div>
              <div className="profile__info">
                <div className="profile__container">
                  <h1 className="profile__name">
                    {currentUser.name}
                  </h1>
                  <button type="button" className="profile__edit" onClick={() => {
                    onEditProfile(true)
                  }} />
                </div>
                  <p className="profile__description">
                    {currentUser.about}
                  </p> 
              </div>
              <button type="button" className="profile__add" onClick={() => {
                onAddCard(true)
              }} />
            </section>
            <section className="photos">
              <ul className="elements">
                {cards.map((cardElement)  => (
                  <Card
                    card = {cardElement}
                    key = {cardElement.cardId}
                    onCardClick = {onCardClick}
                    onCardLike = {onCardLike}
                    onCardDelete = {onCardDelete}
                  />
                ))}
              </ul>
            </section>  
          </main>
    )
}

export default Main;


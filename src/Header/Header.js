import React from 'react';
import './Header.css';
import pig from './pig.png';

export const Header = () => {
  return (
    <header className='header'>
      <figure className='header__figure'>
        <img className='header__image' src={pig} alt='pig-face'/>
      </figure>
      <h1 className='header__text'>Pig Game</h1>
    </header>
  )
}
import React from 'react';
import './Dice.css';
import dice0 from './dice0.png';
import dice1 from './dice1.png';
import dice2 from './dice2.png';
import dice3 from './dice3.png';
import dice4 from './dice4.png';
import dice5 from './dice5.png';
import dice6 from './dice6.png';


export class Dice extends React.Component {
 
  ShowImages = () => {
   const value = this.props.value;
   const classname = 'game-panel__dices-box__figure__img'
   switch(value) {
     case 1:
      return <img className={classname} src={dice1} alt='dice'/>
     case 2:
      return <img className={classname} src={dice2} alt='dice'/>
     case 3:
      return <img className={classname} src={dice3} alt='dice'/>
     case 4:
      return <img className={classname} src={dice4} alt='dice'/>
     case 5:
      return <img className={classname} src={dice5} alt='dice'/>
     case 6:
      return <img className={classname} src={dice6} alt='dice'/>
     default:
      return <img className={classname} src={dice0} alt='dice'/>
    }
  }

  render() {
    return (
      <figure className='game-panel__dices-box__figure'>
        <this.ShowImages />
      </figure>
    );
  }
}  

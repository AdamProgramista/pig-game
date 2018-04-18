import React from 'react';
import './PlayerBox.css';


export class PlayerBox extends React.Component {

  render() {
    const scores = this.props.scores;
    const {playerId, totalScore, currentScore} = scores;
    const active = this.props.activity;
    const gameOver = this.props.gameOver;
 
    return (
      <div className={`player-box player${playerId}`}>
        <div className='player-box__totalscore'>
          <h2 className={active ? 'color-orange' : null}>Player {playerId}</h2>
          <h2 className={active ? 'color-blue' : null}>{totalScore}</h2>
        </div>
        <div className='player-box__winner'>
          <h2 className={(active && gameOver) ? 'color-orange' : 'hide'}>WIN!</h2>
        </div>
        <div className='player-box__currentscore'>
          <h4 className={active ? 'color-yellow' : null}>current score</h4>
          <h4 className={active ? 'color-blue' : null}>{currentScore}</h4>
        </div>
      </div>
    );
  }
}

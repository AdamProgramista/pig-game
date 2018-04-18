import React, { Component } from 'react';
import './App.css';
import {PlayerBox} from './PlayerBox/PlayerBox.js'
import {Header} from './Header/Header.js'
import {Button} from './Button/Button.js'
import {Dice} from './Dice/Dice.js'
import {FaPlus, FaCheck} from 'react-icons/lib/fa';
import {MdLoop} from 'react-icons/lib/md';
import {Footer} from './Footer/Footer.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: [
        {playerId: 1, totalScore: 0, currentScore: 0},
        {playerId: 2, totalScore: 0, currentScore: 0}],
      dicesValues: [0,0],
      activePlayer: 1,
      gameOver: false
    }
  }

  isThisPlayerActive = (player) => player.playerId === this.state.activePlayer

  drawNumbers = () => {
    const dice1 = this.randomizer(6);
    const dice2 = this.randomizer(6);
    let sum;
    this.setState({
      dicesValues: [dice1,dice2]
    })
    if (dice1===1 && dice2===1){
      sum = 25;
      this.drawPigs(sum);
    } else if (dice1===1 || dice2===1) {
      sum = 0;
      this.drawPigs(sum);
    } else if (dice1===dice2){
      sum = (dice1+dice2)*2;
      this.addToCurrentScore(sum);
    } else {
      sum = dice1+dice2;
      this.addToCurrentScore(sum);
    }
  }

  randomizer = (maxValue) => Math.floor(Math.random()*maxValue + 1 )

  addToCurrentScore = (sum) => {
    const currentPlayer = this.state.activePlayer;
    this.setState({
      scores: this.state.scores.map(player => {
        if (player.playerId === currentPlayer){
          return {
            ...player,
            currentScore: player.currentScore+sum
          }
        } else {
          return player;
        }
      })
   })
  }

  saveScore = () => {
    const currentPlayer = this.state.activePlayer
    let currentPlayerScore = this.state.scores[this.state.activePlayer-1];
    const lastPlayer = this.state.scores.length;
    const nextPlayer = (currentPlayer !== lastPlayer) ? currentPlayer+1 : 1;
    const currentPlayerTotalScoreAfterSave = currentPlayerScore.totalScore + currentPlayerScore.currentScore
    const win = (currentPlayerTotalScoreAfterSave>=10) ? true : false;
    
    currentPlayerScore = {
      ...currentPlayerScore,
      totalScore: currentPlayerTotalScoreAfterSave,
      currentScore: 0
    };
  
    win ? this.setState({
      scores: [...this.state.scores.slice(0,this.state.activePlayer-1), currentPlayerScore, ...this.state.scores.slice(this.state.activePlayer)],
      gameOver: true
    }) : this.setState({
      scores: [...this.state.scores.slice(0,this.state.activePlayer-1), currentPlayerScore, ...this.state.scores.slice(this.state.activePlayer)],
      activePlayer: nextPlayer
    })
  }

  drawPigs = (sum) => {
    const currentPlayer = this.state.activePlayer
    let currentPlayerScore = this.state.scores[this.state.activePlayer-1];
    const lastPlayer = this.state.scores.length;
    const nextPlayer = (currentPlayer !== lastPlayer) ? currentPlayer+1 : 1;
    const currentPlayerTotalScoreAfterSave = currentPlayerScore.totalScore + sum
    const win = (currentPlayerTotalScoreAfterSave>=100) ? true : false;
    
    currentPlayerScore = {
      ...currentPlayerScore,
      totalScore: currentPlayerTotalScoreAfterSave,
      currentScore: 0
    };
  
    win ? this.setState({
      scores: [...this.state.scores.slice(0,this.state.activePlayer-1), currentPlayerScore, ...this.state.scores.slice(this.state.activePlayer)],
      gameOver: true,
    }) : this.setState({
      scores: [...this.state.scores.slice(0,this.state.activePlayer-1), currentPlayerScore, ...this.state.scores.slice(this.state.activePlayer)],
      activePlayer: nextPlayer
    })
  }
  
  newGame = () => {
    this.setState({
        scores: [
          {playerId: 1, totalScore: 0, currentScore: 0, winner: false},
          {playerId: 2, totalScore: 0, currentScore: 0, winner: false}],
        dicesValues: [0,0],
        activePlayer: this.randomizer(this.state.scores.length),
        gameOver: false
    })
  }

  render() {
    const gameOver = this.state.gameOver;

    return (
      <div className='App'>
        <Header />
        <div className='game-container'>
          {this.state.scores.map(player => 
            <PlayerBox 
              key={player.playerId} 
              scores={player}
              gameOver={gameOver}
              activity={this.isThisPlayerActive(player)}/>
          )}
          <div className='game-panel'>
            <div className='game-panel__dices-box'>
              {this.state.dicesValues.map((dice,index) => 
                <Dice key={index} value={this.state.dicesValues[index]}/>
              )}
            </div>
            <div className='game-panel__buttons-box'>
              <Button
                clickHandler={this.newGame}
                icon={<FaPlus />}
                text='New game'/>
              <Button
                clickHandler={this.drawNumbers}
                icon={<MdLoop />}
                text='Roll dice'
                isHide={gameOver}/>
              <Button
                clickHandler={this.saveScore}
                icon={<FaCheck />}
                text='Hold'
                isHide={gameOver}/>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;

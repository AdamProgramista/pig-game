import React, { Component } from 'react';
import './Button.css';
import classNames from 'classnames';

export class Button extends Component {

  render() {
    const btnClass = classNames({
      'btn' : true,
      'hide' : this.props.isHide
    });

    const btnClassText = classNames({
      'btn__text' : true,
      'hide' : this.props.isHide
    });

    return (
      <button
        className={btnClass}
        onClick={this.props.clickHandler}>
        {this.props.icon}<span className='btn__text'>{this.props.text}</span>
        </button>
    );
  }
}
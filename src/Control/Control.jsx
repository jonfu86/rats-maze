import React, { Component } from 'react';
import style from './styles.css';
import ratImg from '../img/rat.png';
import cheese from '../img/cheese.png';
import wall from '../img/wall.png';

export default class Control extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: false
    }
    this.handleOptionToggle = this.handleOptionToggle.bind(this);
  }

  handleOptionToggle(e) {
    this.setState({
      option: e.target.id
    })
  }

  render() {
    const { option } = this.state;
    return (
      <div className={style.control}>
        <h1>Settings</h1>
        <div id="rat" className={option === 'rat' ? `${style.option} ${style.active}` : style.option} onClick={this.handleOptionToggle}>
          <img src={ratImg}></img>
          <div className={style.text}>
            Set rat start position
          </div>
        </div>

        <div id="cheese" className={option === 'cheese' ? `${style.option} ${style.active}` : style.option} onClick={this.handleOptionToggle}>
          <img src={cheese}></img>
          <div className={style.text}>
            Set cheese position
          </div>
        </div>

        <div id="walls" className={option === 'walls' ? `${style.option} ${style.active}` : style.option} onClick={this.handleOptionToggle}>
          <img src={wall}></img>
          <div className={style.text}>
            Toggle walls
          </div>
        </div>
      </div >
    );
  }

}
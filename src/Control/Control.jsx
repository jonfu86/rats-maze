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
    const { update } = this.props;
    const { option } = this.state;

    if (e.target.id === option) {
      this.setState({
        option: false
      }, update(false));
    } else {
      this.setState({
        option: e.target.id
      }, update(e.target.id));
    }

  }


  render() {
    const { option } = this.state;
    const { solutions, runMaze } = this.props;
    let controlBody;

    if (solutions && solutions.length > 0) {
      controlBody = <>
        <h1>Solutions</h1>
        {
          solutions.map((path, index) => (
            <div className={style.solution} onClick={() => runMaze(path)}> Solution: {index + 1}  ({path.length - 1} steps) </div>
          ))
        }
      </>
    } else {
      controlBody = <>
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
      </>
    }

    return (
      <div className={style.control}>
        {controlBody}
      </div >
    );
  }

}
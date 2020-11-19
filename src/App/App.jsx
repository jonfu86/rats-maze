import React, { Component } from 'react';
import style from './styles.css';
import stones from '../img/stones.jpg';
import rat from '../img/rat.png';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maze: [[0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]],
      position: [0, 0],
      end: [7, 7]
    }

    this.maze = React.createRef();

    this.hitTile = this.hitTile.bind(this);
  }

  componentDidMount() {
    const { position, end } = this.state;
    this.setRat(position);
    this.setEnd(end);
  }

  setRat(grid) {
    const row = this.maze.current.children.item(grid[0] + 1);
    const tile = row.children.item(grid[1]);
    // const ratImg = <img src={rat} className={style.rat}></img>;
    // tile.innerHTML = ratImg;
    console.log(tile);
  }

  setEnd(grid) {

  }

  hitTile(e) {
    const { position } = this.state;
    // console.log('row, col: ', e.target.attributes.grid.value);
    const y = parseInt(e.target.attributes.grid.value[0]);
    const x = parseInt(e.target.attributes.grid.value[2]);
    // console.log(grid[0], grid[2]);
    this.setState({
      position: [y, x]
    })
  }
  runMaze(e) {
    console.log('runMaze');
  }

  render() {

    const { maze, position, end } = this.state;

    return (
      <div className={style.app}>
        <h1>The Rat's Maze</h1>
        <div className={style.maze} onClick={this.hitTile} ref={this.maze}>
          <img src={stones} className={style.stones}></img>
          {maze.map((row, yIndex) =>
            <div key={yIndex} y={yIndex} className={style.row}>
              {row.map((tile, xIndex) =>
                <div key={xIndex} grid={`${yIndex},${xIndex}`} className={style.tile}>
                  {position[0] === yIndex && position[1] === xIndex ? <img src={rat} className={style.rat}></img> : <div></div>}
                </div>
              )}
            </div>
          )}
        </div>

        <button className={style.runButton} type="button" onClick={this.runMaze}>Run</button>
      </div >
    );
  }
}


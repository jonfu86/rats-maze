import React, { Component } from 'react';
import style from './styles.css';
import stones from '../img/stones.jpg';
import rat from '../img/rat.png';
import cheese from '../img/cheese.png';


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

    const y = parseInt(e.target.attributes.grid.value[0]);
    const x = parseInt(e.target.attributes.grid.value[2]);
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
              {row.map((tile, xIndex) => {
                let square;

                if ((position[0] === yIndex && position[1] === xIndex) && (end[0] === yIndex && end[1] === xIndex)) {
                  //mouse found cheese
                  square = <div><img src={rat} className={style.rat}></img><img src={cheese} className={style.cheese}></img></div>;
                } else if (position[0] === yIndex && position[1] === xIndex) {
                  square = <img src={rat} className={style.rat}></img>;
                } else if (end[0] === yIndex && end[1] === xIndex) {
                  square = <img src={cheese} className={style.cheese}></img>;
                }

                return <div key={xIndex} grid={`${yIndex},${xIndex}`} className={style.tile}>
                  {square}
                </div>
              }

              )}
            </div>
          )}
        </div>

        <button className={style.runButton} type="button" onClick={this.runMaze}>Run</button>
      </div >
    );
  }
}


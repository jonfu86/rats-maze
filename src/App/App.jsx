import React, { Component } from 'react';
import Control from '../Control/Control.jsx';
import style from './styles.css';
import stones from '../img/stones.jpg';
import ratImg from '../img/rat.png';
import cheese from '../img/cheese.png';
import wall from '../img/wall.png';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maze: [[0, 1, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]],
      rat: [0, 0],
      end: [7, 7]
    }

    this.maze = React.createRef();

    this.hitTile = this.hitTile.bind(this);
  }

  componentDidMount() {
    const { rat, end } = this.state;
    this.setRat(rat);
    this.setEnd(end);
  }

  setRat(grid) {
    // const row = this.maze.current.children.item(grid[0] + 1);
    // const tile = row.children.item(grid[1]);
    // const { rat } = this.state;

    // const y = parseInt(e.target.attributes.grid.value[0]);
    // const x = parseInt(e.target.attributes.grid.value[2]);
    const y = grid[0];
    const x = grid[1];

    this.setState({
      rat: [y, x]
    })
  }

  setEnd(grid) {

  }

  hitTile(e) {

  }

  runMaze(e) {
    console.log('runMaze');
  }

  toggleWall(y, x) {
    this.setState((current) => {
      current.maze[y][x] === 0 ? 1 : 0;
      return { maze: current.maze };
    })
  }


  render() {

    const { maze, rat, end } = this.state;


    return (
      <div className={style.app}>

        <div className={style.main}>
          <h1>The Rat's Maze</h1>
          <div className={style.maze} onClick={this.hitTile} ref={this.maze}>
            <img src={stones} className={style.stones}></img>
            {maze.map((row, yIndex) =>
              <div key={yIndex} y={yIndex} className={style.row}>
                {row.map((tile, xIndex) => {
                  let square;

                  if ((rat[0] === yIndex && rat[1] === xIndex) && (end[0] === yIndex && end[1] === xIndex)) {
                    //mouse found cheese
                    square = <div><img src={ratImg} className={style.rat}></img><img src={cheese} className={style.cheese}></img></div>;
                  } else if (rat[0] === yIndex && rat[1] === xIndex) {
                    square = <img src={ratImg} className={style.rat}></img>;
                  } else if (end[0] === yIndex && end[1] === xIndex) {
                    square = <img src={cheese} className={style.cheese}></img>;
                  } else if (maze[yIndex][xIndex] === 1) {
                    square = <img src={wall} className={style.wall}></img>
                  }

                  return <div key={xIndex} grid={`${yIndex}, ${xIndex}`} className={style.tile}>
                    {square}
                  </div>
                }

                )}
              </div>
            )}
          </div>

          <button className={style.runButton} type="button" onClick={this.runMaze}>Run</button>

        </div>
        <Control />

      </div >
    );
  }
}


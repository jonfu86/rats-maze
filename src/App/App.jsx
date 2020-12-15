import React, { Component } from 'react';
import Control from '../Control/Control.jsx';
import style from './styles.css';
import stones from '../img/stones.jpg';
import ratImg from '../img/rat.png';
import cheeseImg from '../img/cheese.png';
import wall from '../img/wall.png';
import MazeSolver from '../MazeSolver.js';


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
      rat: [0, 0],
      cheese: [7, 7],
      option: false,
      solutions: null
    }

    this.maze = React.createRef();

    this.hitTile = this.hitTile.bind(this);
    this.updateOption = this.updateOption.bind(this);
    this.solveMaze = this.solveMaze.bind(this);
    this.runMaze = this.runMaze.bind(this);
  }

  componentDidMount() {
    // const { rat, cheese } = this.state;
    // this.setRat(rat);
    // this.setCheese(cheese);
  }

  setRat(y, x) {
    this.setState({
      rat: [y, x]
    })
  }

  setCheese(y, x) {
    this.setState({
      cheese: [y, x]
    })
  }

  hitTile(e) {
    const { option } = this.state;
    const y = parseInt(e.target.attributes.grid.value[0]);
    const x = parseInt(e.target.attributes.grid.value[2]);



    if (option === 'walls') {
      this.toggleWall(y, x);
    } else if (option === 'rat') {
      this.setRat(y, x);
    } else if (option === 'cheese') {
      this.setCheese(y, x);
    }
  }

  solveMaze() {
    const { maze, rat, cheese } = this.state;
    var solutions = MazeSolver(maze, rat, cheese);
    this.setState({ solutions });
  }

  runMaze(path) {
    let copy = path.slice();
    if (path.length > 0) {
      this.setState({ rat: path[0] });
    }
    copy.shift();
    setTimeout(() => {
      this.runMaze(copy);
    }, 400);
  }

  toggleWall(y, x) {
    const { maze } = this.state;
    let copy = maze.slice();
    //toggle tile in copy
    copy[y][x] = copy[y][x] === 0 ? 1 : 0;

    this.setState({
      maze: copy
    });
  }

  updateOption(option) {
    this.setState({
      option: option
    });
  }


  render() {

    const { maze, rat, cheese, solutions } = this.state;

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

                  if ((rat[0] === yIndex && rat[1] === xIndex) && (cheese[0] === yIndex && cheese[1] === xIndex)) {
                    //rat found cheese
                    square = <div><img src={ratImg} className={style.rat}></img><img src={cheeseImg} className={style.cheese}></img></div>;
                  } else if (rat[0] === yIndex && rat[1] === xIndex) {
                    //rat in tile
                    square = <img src={ratImg} className={style.rat}></img>;
                  } else if (cheese[0] === yIndex && cheese[1] === xIndex) {
                    //cheese in tile
                    square = <img src={cheeseImg} className={style.cheese}></img>;
                  } else if (maze[yIndex][xIndex] === 1) {
                    //tile has a wall
                    square = <img src={wall} className={style.wall}></img>
                  }

                  return <div key={xIndex} grid={`${yIndex},${xIndex}`} className={style.tile}>
                    {square}
                  </div>
                }

                )}
              </div>
            )}
          </div>

          {Array.isArray(solutions) && solutions.length === 0 ? <div className={style.warn}>No Valid Solutions, Try a New Maze </div> : null}

          <button className={style.solveButton} type="button" onClick={this.solveMaze}>Solve</button>

        </div>
        <Control update={this.updateOption} solutions={solutions} runMaze={this.runMaze} />

      </div >
    );
  }
}


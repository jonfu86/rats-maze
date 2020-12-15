var MazeSolver = (maze, start, end) => {
  const directions = ['up', 'down', 'left', 'right'];
  const solutions = [];

  //treat each square or step as a duple [row, col]
  var findPath = (path) => {

    var checkBack = (step) => {
      return JSON.stringify(path).includes(JSON.stringify(step));
    }

    // console.log('path', path);
    //iterate through maze from top left to bottom right
    const step = path[path.length - 1];
    const lastStep = path[path.length - 2];

    //if step is at the end, maze has been solved
    if (step[0] === end[0] && step[1] === end[1]) {
      //once path is solved, convert into matrix
      // const solution = Array(maze.length).fill(0).map(x => Array(maze[0].length).fill(0));

      // path.forEach(walk => {
      //   solution[walk[0]][walk[1]] = 1;
      // })
      return solutions.push(path);
    } else {
      directions.forEach(direct => {
        const row = step[0];
        const col = step[1];

        if (direct === 'up') {
          //check if square is lastStep
          if (checkBack([row - 1, col])) {
            //do not backtrack
            return;
            //check if out of bounds
          } else if (typeof maze[row - 1] === 'undefined') {
            return;
          }
          //check if square above step is 0
          else if (maze[row - 1][col] === 0) {
            const copy = path.slice();
            copy.push([row - 1, col]);
            //recurse
            return findPath(copy);
          }
        }
        else if (direct === 'down') {

          //check if square is lastStep
          if (checkBack([row + 1, col])) {
            //do not backtrack
            // console.log('backtracking!!!');
            return;
          } else if (typeof maze[row + 1] === 'undefined') {
            return;
          }
          //check if square below step is 0
          else if (maze[row + 1][col] === 0) {
            const copy = path.slice();
            copy.push([row + 1, col]);
            //recurse
            return findPath(copy);
          }
        }
        else if (direct === 'left') {
          //check if square is lastStep
          if (checkBack([row, col - 1])) {
            //do not backtrack
            return;
          } else if (typeof maze[row][col - 1] === 'undefined') {
            return;
          }
          //check if square below step is 0
          else if (maze[row][col - 1] === 0) {
            // console.log('left');
            const copy = path.slice();
            copy.push([row, col - 1]);
            //recurse
            return findPath(copy);
          }
        }
        else if (direct === 'right') {
          //check if square is lastStep
          if (checkBack([row, col + 1])) {
            //do not backtrack
            // console.log('backtracking!!!');
            return;

          } else if (typeof maze[row][col + 1] === 'undefined') {
            return;
          }
          //check if square below step is 0
          else if (maze[row][col + 1] === 0) {
            const copy = path.slice();
            copy.push([row, col + 1]);
            //recurse
            return findPath(copy);
          }
        }
      });
    }
  }
  findPath([start]);
  //sorted by length ascending
  return solutions.sort((a, b) => a.length - b.length);
}

export default MazeSolver;
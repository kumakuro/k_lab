var islandPerimeter = function (grid) {
  let count = 0;
  for (let i in grid) {
    for (let j in grid[i]) {
      if (grid[i][j] === 1) {
        count += 4;
        if (grid[i][j * 1 + 1] && grid[i][j * 1 + 1] === 1) {
          count -= 2;
        }
        if (grid[i * 1 + 1] && grid[i * 1 + 1][j] === 1) {
          count -= 2;
        }
      }
    }
  }
  return count;
};



// var islandPerimeter = function (grid) {
//   let count = 0, overlaps = 0;
//   for (let i in grid) {
//     for (let j in grid[i]) {
//       if (grid[i][j] === 1) {
//         count++;
//         if (grid[i][j * 1 + 1] && grid[i][j * 1 + 1] === 1) {
//           overlaps++;
//         }
//         if (grid[i * 1 + 1] && grid[i * 1 + 1][j] === 1) {
//           overlaps++;
//         }
//       }
//     }
//   }
//   return 4 * count - overlaps * 2;
// };

let arr = [
  [0, 1, 0, 0],
  [1, 1, 1, 0],
  [0, 1, 0, 0],
  [1, 1, 0, 0]
]

console.log(islandPerimeter(arr))
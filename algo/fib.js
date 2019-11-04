
var fib = function (N) {
  if (N < 2) return N;
  let prev = 0, curr = 1;
  for (let i = 0; i < N - 1; i++) {
    let sum = prev + curr;
    prev = curr;
    curr = sum;
  }
  return curr
}

console.log(fib(8))


// let fibObj = {}
// var fib = function (N) {
//   if (!fibObj[N]) {
//     let result;
//     switch (N) {
//       case 0:
//         result = 0;
//         break;
//       case 1:
//         result = 1;
//         break;
//       default:
//         result = (fibObj[N - 1] || fib(N - 1)) + (fibObj[N - 2] || fib(N - 2))
//         break;
//     }
//     fibObj[N] = result
//     return result;
//   } else {
//     return fibObj[N]
//   }
// };

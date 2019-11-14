var maxProfit = function (prices) {
  let inPrice = undefined,
    differ = 0;
  for (let i = 0; i < prices.length; i++) {
    if (inPrice == undefined) {
      inPrice = prices[i]
    };
    if (prices[i] < inPrice || inPrice == undefined) {
      inPrice = prices[i]
    };
    if (prices[i] - inPrice > differ) {
      differ = prices[i] - inPrice
    }
  }
  return differ;
};


let arr = [7, 1, 5, 3, 6, 4];
[7, 6, 4, 3, 1];


console.log('maxProfit(arr)->', maxProfit(arr))

// // 暴力双循环
// var maxProfit = function (prices) {
//   let maxCount = 0;
//   for (let i = 0; i < prices.length; i++) {
//     let inPrice = prices[i];
//     for (let j = i + 1; j < prices.length; j++) {
//       if (prices[j] - inPrice > maxCount) {
//         maxCount = prices[j] - inPrice
//       }
//     }
//   }

//   return maxCount;
// };
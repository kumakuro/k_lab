var findDuplicate = function (nums) {
  let num;
  nums.filter((itm, idx) => {
    if (nums.indexOf(itm) != idx) {
      num = itm;
    }
  })
  return num
};

let arr = [3, 1, 3, 4, 2]
console.log(findDuplicate(arr))
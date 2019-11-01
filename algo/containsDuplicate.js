var containsDuplicate = function (nums) {
  var flag = false;
  nums.forEach((itm, idx) => {
    if (nums.indexOf(itm) != idx) {
      flag = true;
    }
  });

  return flag;
};

console.log(containsDuplicate([1,1,1,3,3,4,3,2,4,2]))
// var removeDuplicates = function (nums) {
//     if (nums.length == 0) return 0;
//     let i = 0;
//     for (let j = 1; j < nums.length; j++) {
//         if (nums[j] != nums[i]) {
//             i++;
//             nums[i] = nums[j]
//         }
//     }
//     return i + 1
// };

var removeDuplicates = function (nums) {
    nums = nums.reduce((pre, cur) => {
        if (!pre.includes(cur)) {
            return pre.concat(cur)
        } else {
            return pre
        }
    }, [])
    console.log(nums)
    return nums.length
};


let nums = [1, 1, 2]
let length = removeDuplicates(nums)
console.log('arr.length--->', length)
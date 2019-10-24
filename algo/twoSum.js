/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    let arr = []
    for (let i in nums) {
        for (let j in nums) {
            if (i < j && nums[i] + nums[j] == target) {
                arr.push(i);
                arr.push(j);
                break;
            }
        }
    }
    return arr;
};

let nums = [2, 3, 11, 3]
let arr = twoSum(nums, 6)
console.log('arr--->', arr)
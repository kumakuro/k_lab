var intersection = function (nums1, nums2) {
  let long = nums1.length >= nums2.length ? nums1 : nums2,
    short = nums1.length >= nums2.length ? nums2 : nums1,
    set = new Set();
  for (let i in long) {
    if (short.indexOf(long[i]) > -1) {
      set.add(long[i])
    }
  }
  return Array.from(set);
};

let nums1 = [4, 9, 5], nums2 = [9, 4, 9, 8, 4]
console.log(intersection(nums1, nums2));
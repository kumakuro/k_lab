function quickSort(arr, low, high) {
  let key = arr[low],
    start = low,
    end = high;

  while (end > start) {
    while (end > start && arr[end] >= key) end--;
    if (arr[end] <= key) {
      var temp = arr[end];
      arr[end] = arr[start];
      arr[start] = temp;
    }
    while (end > start && arr[start] <= key) start++;
    if (arr[end] >= key) {
      var temp = arr[start];
      arr[start] = arr[end];
      arr[end] = temp;
    }
  }
  if (start > low) quickSort(arr, low, start - 1);
  if (end < high) quickSort(arr, end + 1, high);
}


let arr = [5, 3, 7, 6, 4, 1, 0, 2, 9, 10, 8]
let prevTime = (new Date()).getTime();
quickSort(arr, 0, arr.length - 1)
let nextTime = (new Date()).getTime();

console.log('prevTime -- > ', prevTime, 'nextTime -- > ', nextTime)
console.log(arr)

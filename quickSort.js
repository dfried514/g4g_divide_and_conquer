const lineReader = require('line-reader');

let numComparisons = 0;

const quickSort = (array, l, r) => {
  if (l >= r) {
    return;
  }
  const first_as_pivot = (l, r) => l;
  const last_as_pivot = (l, r) => r;
  const random_as_pivot = (l, r) => Math.floor(Math.random() * (r - l + 1)) + l;
  const median_of_three_as_pivot = (l, r) => {
    const middle = Math.floor((l + r) / 2);
    if (array[l] >= array[middle] && array[l] >= array[r]) {
      return array[middle] >= array[r] ? middle : r;
    }
    if (array[middle] >= array[l] && array[middle] >= array[r]) {
      return array[l] >= array[r] ? l : r;
    }
    return array[l] >= array[middle] ? l : middle;
  }
  const partition = (l, r) => {
    const pivotValue = array[l];
    let i = l + 1;

    for (let j = l + 1; j <= r; j++) {
      if (array[j] < pivotValue) {
        [array[j], array[i]] = [array[i], array[j]];
        i++;
      }
    }
  [array[l], array[i - 1]] = [array[i - 1], array[l]];
  return i - 1;
  }
  const choosePivot = (l, r, pivotSelection) => {
    return pivotSelection(l, r);
  }

  let pivot = choosePivot(l, r, first_as_pivot);
  [array[l], array[pivot]] = [array[pivot], array[l]];
  numComparisons += (r - l);
  pivot = partition(l, r);
  quickSort(array, l, pivot - 1);
  quickSort(array, pivot + 1, r);
  return [array, numComparisons];
}

// let array = [3, 8, 2, 5, 1, 4, 7, 6];
// console.log(quickSort(array, 0, array.length - 1));

let integerArray = [];

lineReader.eachLine('quickSort.txt', function(line, last) {
  integerArray.push(parseInt(line));
  // do whatever you want with line...
  if(last){
    // or check if it's the last one
    console.log(quickSort(integerArray, 0, integerArray.length - 1)[1]);
  }
});

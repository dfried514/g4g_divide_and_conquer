const lineReader = require('line-reader');

const sort_and_countInv = array => {
  if (array.length === 1) {
    return [array, 0];
  }
  const merge_and_countSplitInv = (a1, a2) => {
    let mergeArray = [];
    let a = a1[0];
    let b = a2[0];
    let i = 0;
    let j = 0;
    let splitInv = a1[1] + a2[1];

    while (i < a.length && j < b.length) {
      if (a[i] <= b[j]) {
        mergeArray.push(a[i++]);
      } else {
        mergeArray.push(b[j++]);
        splitInv += (a.length - i);
      }
    }
    while (i < a.length) {
      mergeArray.push(a[i++]);
    }
    while (j < b.length) {
      mergeArray.push(b[j++]);
    }
    return [mergeArray, splitInv];
  }
  let mid = Math.ceil(array.length / 2);
  let a1 = array.slice(0, mid);
  let a2 = array.slice(mid);

  return merge_and_countSplitInv(sort_and_countInv(a1), sort_and_countInv(a2));
}

let integerArray = [];

lineReader.eachLine('integerArray.txt', function(line, last) {
  integerArray.push(parseInt(line));
  // do whatever you want with line...
  if(last){
    // or check if it's the last one
    console.log(sort_and_countInv(integerArray)[1]);
  }
});

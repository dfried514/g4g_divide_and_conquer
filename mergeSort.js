const mergeSort = array => {
  if (array.length === 1) {
    return array;
  }
  const merge = (a1, a2) => {
    let mergeArray = [];
    let i = 0;
    let j = 0;

    while (i < a1.length && j < a2.length) {
      if (a1[i] <= a2[j]) {
        mergeArray.push(a1[i++]);
      } else {
        mergeArray.push(a2[j++]);
      }
    }
    while (i < a1.length) {
      mergeArray.push(a1[i++]);
    }
    while (j < a2.length) {
      mergeArray.push(a2[j++]);
    }
    return mergeArray;
  }
  let mid = Math.ceil(array.length / 2);
  let a1 = array.slice(0, mid);
  let a2 = array.slice(mid);

  return merge(mergeSort(a1), mergeSort(a2));
}

let array = [11, 13, 21, 9, 7, 5, 4, 3, 2, 1];

console.log(mergeSort(array));


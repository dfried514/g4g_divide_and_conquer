const maxSubArraySum = array => {
  //using divide and conquer, and recursion,
  //divide array into left, and right,
  //compare max of left, right, and across middle
  //to compute max value
  const max2 = (a, b) => (a >= b) ? a : b;
  const max3 = (a, b, c) => max2(max2(a, b), c);
  const maxIncludingMid = arr => {
    const midPoint = Math.ceil(arr.length / 2);
    const arr1 = arr.slice(0, midPoint);
    const arr2 = arr.slice(midPoint);
    console.log(arr1, arr2);
    let leftMax = Number.MIN_VALUE;
    let rightMax = Number.MIN_VALUE;
    let sum1 = 0;
    let sum2 = 0;

    for (let i = arr1.length - 1; i >= 0; i--) {
      sum1 += arr1[i];
      if (sum1 > leftMax) {
        leftMax = sum1;
      }
    }

    for (let j = 0; j < arr2.length; j++) {
      sum2 += arr2[j];
      if (sum2 > rightMax) {
        rightMax = sum2;
      }
    }
    return leftMax + rightMax;
  };

  const maxSum = arr => {
    if (arr.length === 1) {
      return arr[0];
    }
    const midPoint = Math.floor(arr.length / 2);
    const arr1 = arr.slice(0, midPoint);
    const arr2 = arr.slice(midPoint);
    return max3(maxSum(arr1), maxSum(arr2), maxIncludingMid(arr));
  }
  return maxSum(array);
}

let array = [1000, 100, -1, -1, -100, 100];

console.log(maxSubArraySum(array));

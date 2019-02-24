const multiply_bruteForce = (x, y) => {
  // input: two integers
  // output: product of the two integers
  // create arrays of single-digit integers for input
  // iterate over both arrays, right to left
  // increment ten exponent value for padding
  // keep local carry value updated
  // multiply digits,
  // store right-most digit in current string
  // carry overflow digit for next multiplication
  const x_array = x.toString().split('');
  const y_array = y.toString().split('');
  let result_array = [];

  for (let i = x_array.length - 1; i >= 0; i--) {
    let carry = 0;
    let cur_product_str = Math.pow(10, (x_array.length - i - 1)).toString();
    cur_product_str = cur_product_str.slice(1);
    let cur_x_digit = parseInt(x_array[i]);
    for (let j = y_array.length - 1; j >= 0; j--) {
      let cur_y_digit = parseInt(y_array[j]);
      let cur_product_num = (cur_x_digit * cur_y_digit) + carry;
      let cur_right_digit = cur_product_num % 10;
      carry = Math.floor(cur_product_num / 10);
      cur_product_str = cur_right_digit + cur_product_str;
    }
    if (carry > 0) {
       cur_product_str = carry + cur_product_str;
    }
    result_array.push(cur_product_str.split('').reverse().join(''));
  }
  // create local increment pointer variable, initialize to 0
  // iterate over array of product strings
  // while there is at least one digit in position counter points to
  // add digits, adding right-most position to output string
  // carrying left-most digit to next place
  // reverse and return output string as integer
  carry = 0;
  let pointer = 0;
  let output = '';
  let moreDigits = true;
  while (moreDigits) {
    moreDigits = false;
    let curSum = 0;
    for (let i = 0; i < result_array.length; i++) {
      let curDigit = result_array[i].charAt(pointer);
      if (curDigit.length === 1) {
        moreDigits = true;
        let curDigitNum = parseInt(curDigit);
        curSum += curDigitNum;
      }
    }
    curSum += carry;
    output = (curSum % 10) + output;
    carry = Math.floor(curSum / 10);
    pointer++;
  }
  return Number(output);
}

let x = 5678;
let y = 1234;

console.log(multiply_bruteForce(x, y));


//katasuba formula: x * y = 10^n(ac) + 10^n/2(ad + bc) + bd
//x is divided in half: a|b
//y is divided in half: c|d
//start by converting x and y to strings
//then divide each in half to produce a, b, c, d
//recursively comput ac, bd, (a + b)(c + d)
//= ac + ad + bc + bd (- ac - bd) = ad + bc
//then compute the formula
//return the input if the input length is 1 or 0
const bigInt = require('big-integer');

const multiply_karatsuba = (x, y) => {
  let xBig = bigInt(x);
  let yBig = bigInt(y);

  let n = (xBig.toString().length >= yBig.toString().length)
    ? xBig.toString().length : yBig.toString().length;
  if (n === 1) {
    return xBig.times(yBig);
  }
  while (n % 2 > 0) {
    n++;
  }
  const aBig = bigInt(xBig.toString().slice(0, xBig.toString().length - Math.floor(n/2)));
  const bBig = bigInt(xBig.toString().slice(Math.floor(-n/2)));
  const cBig = bigInt(yBig.toString().slice(0, yBig.toString().length - Math.floor(n/2)));
  const dBig = bigInt(yBig.toString().slice(Math.floor(-n/2)));

  let ac = multiply_karatsuba(aBig, cBig);
  ac = bigInt(ac);
  let bd = multiply_karatsuba(bBig, dBig);
  let step3 = multiply_karatsuba(aBig.plus(bBig), cBig.plus(dBig));
  step3 = bigInt(step3);
  let adPlusBc = step3.minus(bd).minus(ac);

  return ac.times(bigInt(10).pow(n)).add(adPlusBc.times(bigInt(10).pow(n/2))).add(bd).toString();
};

let x = bigInt('3141592653589793238462643383279502884197169399375105820974944592');
let y = bigInt('2718281828459045235360287471352662497757247093699959574966967627');


let a = bigInt('1234');
let b = bigInt('5678');

console.log(multiply_karatsuba(a, b));
console.log(multiply_karatsuba(x, y));

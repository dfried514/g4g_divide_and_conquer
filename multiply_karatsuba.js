//katasuba formula: x * y = 10^n(ac) + 10^n/2(ad + bc) + bd
//x is divided in half: a|b
//y is divided in half: c|d
//start by converting x and y to strings
//then divide each in half to produce a, b, c, d
//recursively comput ac, bd, (a + b)(c + d)
//= ac + ad + bc + bd (- ac - bd) = ad + bc
//then compute the formula
//return the input if the input length is 1 or 0
const multiply_karatsuba = (x, y) => {
  const makeEqualLengthAndPowerOfTwo = (x, y) => {
    if (typeof x !== 'string') {
      x = x.toString();
    }
    if (typeof y !== 'string') {
      y = y.toString();
    }
    while (x.length !== y.length) {
      if (x.length < y.length) {
        x = '0' + x;
      } else {
        y = '0' + y;
      }
    }
    while (x.length > 1 && x.length % 2 > 0) {
      x = '0' + x;
      y = '0' + y;
    }
    return [x, y];
  };
  let inputs = makeEqualLengthAndPowerOfTwo(x, y);
  let xStr = inputs[0];
  let yStr = inputs[1];

  let n = xStr.length;

  if (n === 1) {
    return x * y;
  }
  const aStr = xStr.substring(0, Math.floor(n/2));
  const bStr = xStr.substring(Math.floor(n/2));
  const cStr = yStr.substring(0, Math.floor(n/2));
  const dStr = yStr.substring(Math.floor(n/2));

  const a = parseInt(aStr);
  const b = parseInt(bStr);
  const c = parseInt(cStr);
  const d = parseInt(dStr);

  const ac = multiply_karatsuba(a, c);
  const bd = multiply_karatsuba(b, d);
  const step3 = multiply_karatsuba((a + b), (c + d));
  const adPlusBc = step3 - bd - ac;

  return (Math.pow(10, n) * ac) + (Math.pow(10, n/2) * adPlusBc) + bd;
};

let x = 5678;
let y = 1234;

console.log(multiply_karatsuba(x, y));

function minDigit(x) {
    if (typeof x !== "number") return NaN;

    if (!Number.isInteger(x)) return NaN;

    if (x < 0) return NaN;

    if (x === 0) return 0;

    let min = 9;

    while (x > 0) {
        let digit = x % 10;
        if (digit < min) {
            min = digit;
        }
        if (min === 0) break;
        x = (x - digit) / 10;
    }

    return min;
}


console.log(minDigit(53894));
console.log(minDigit(4002));
console.log(minDigit(999));
console.log(minDigit(0));

console.log(minDigit(-10));
console.log(minDigit(12.5));
console.log(minDigit("123"));

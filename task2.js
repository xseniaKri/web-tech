function gcd(a, b) {
    if (typeof a !== "number" || typeof b !== "number") {
        return NaN;
    }

    if (!Number.isInteger(a) || !Number.isInteger(b)) {
        return NaN;
    }

    if (a < 0 || b < 0) {
        return NaN;
    }

    if (a === 0 && b === 0) {
        return NaN;
    }

    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }

    return a;
}

console.log(gcd(12, 8));
console.log(gcd(15, 0)); 
console.log(gcd(0, 20));
console.log(gcd(3, 7));
console.log(gcd(48, 18));

console.log(gcd(-5, 10));
console.log(gcd(10, -5));
console.log(gcd(3.5, 2));
console.log(gcd("abc", 5));
console.log(gcd(0, 0));

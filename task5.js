function fibb(n) {
    if (typeof n !== "number" || !Number.isInteger(n) || n < 0 || n > 1000) {
        return "Некорректный ввод";
    }
    if (n === 0) return 0;
    if (n === 1) return 1;

    let a = 0;
    let b = 1;
    for (let i = 2; i <= n; i++) {
        let next = a + b;
        a = b;
        b = next;
    }
    return b;
}

console.log(fibb(-1));       
console.log(fibb(0));        
console.log(fibb(1));        
console.log(fibb(2));        
console.log(fibb(10));       
console.log(fibb(50));       
console.log(fibb(1000));     
console.log(fibb(1001));
console.log(fibb("abc"));    
console.log(fibb(3.14));     

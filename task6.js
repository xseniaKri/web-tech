function getSortedArray(array, key) {
    if (!Array.isArray(array)) return "Некорректный ввод: array";
    if (typeof key !== "string") return "Некорректный ввод: key";

    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
            const x = arr[j][key];
            const y = arr[j + 1][key];

            const compare =
                typeof x === "number" && typeof y === "number"
                    ? x - y
                    : String(x).localeCompare(String(y));

            if (compare > 0) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }

    return arr;
}



const people = [
    { name: "Иван", age: 30 },
    { name: "Пётр", age: 20 },
    { name: "Анна", age: 25 }
];
console.log("Тест 1:", getSortedArray(people, "age"));


console.log("Тест 2:", getSortedArray(people, "name"));


const items = [
    { price: 100 },
    { price: 50 },
    { price: 100 },
    { price: 10 }
];
console.log("Тест 3:", getSortedArray(items, "price"));


console.log("Тест 4:", getSortedArray([{ x: 5 }], "x"));


console.log("Тест 5:", getSortedArray([], "x"));


console.log("Тест 6:", getSortedArray("abc", "x"));


console.log("Тест 7:", getSortedArray(people, 123));


const mixedNames = [
    { name: "anna" },
    { name: "Борис" },
    { name: "Анна" },
    { name: "boris" }
];
console.log("Тест 8:", getSortedArray(mixedNames, "name"));

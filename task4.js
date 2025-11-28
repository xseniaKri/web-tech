function pluralizeRecords(n) {
    if (typeof n !== "number" || !Number.isInteger(n) || n < 0) {
        return "Некорректный ввод";
    }

    const lastDigit = n % 10;
    const lastTwo = n % 100;

    let word;
    let verb;

    if (lastDigit === 1 && lastTwo !== 11) {
        word = "запись";
    } else if ([2, 3, 4].includes(lastDigit) && !(lastTwo >= 12 && lastTwo <= 14)) {
        word = "записи";
    } else {
        word = "записей";
    }

    if (lastDigit === 1 && lastTwo !== 11) {
        verb = "была найдена";
    } else if ([2, 3, 4].includes(lastDigit) && !(lastTwo >= 12 && lastTwo <= 14)) {
        verb = "были найдены";
    } else {
        verb = "было найдено";
    }

    return `В результате выполнения запроса ${verb} ${n} ${word}`;
}


console.log(pluralizeRecords(0));
console.log(pluralizeRecords(1));
console.log(pluralizeRecords(2));
console.log(pluralizeRecords(4));
console.log(pluralizeRecords(5));
console.log(pluralizeRecords(11));
console.log(pluralizeRecords(21));
console.log(pluralizeRecords(24));
console.log(pluralizeRecords(25));
console.log(pluralizeRecords(112));
console.log(pluralizeRecords("abc"));
console.log(pluralizeRecords(-2));

function cesar(str, shift, action) {
    const alphabetLower = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
    const alphabetUpper = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
    const alphabetLength = alphabetLower.length;
    
    if (action === 'decode') {
        shift = alphabetLength - (shift % alphabetLength);
    }
    
    let result = '';
    
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        
        if (alphabetLower.includes(char)) {
            const currentIndex = alphabetLower.indexOf(char);
            const newIndex = (currentIndex + shift) % alphabetLength;
            result += alphabetLower[newIndex];
        }
        else if (alphabetUpper.includes(char)) {
            const currentIndex = alphabetUpper.indexOf(char);
            const newIndex = (currentIndex + shift) % alphabetLength;
            result += alphabetUpper[newIndex];
        }
        else {
            result += char;
        }
    }
    
    return result;
}

const encryptedMessage = "эзтыхз фзъзъз";

for (let shift = 1; shift <= 32; shift++) {
    const decrypted = cesar(encryptedMessage, shift, 'decode');
    console.log(`Сдвиг ${shift}: ${decrypted}`);
}

const correctShift = 8;
const decodedMessage = cesar(encryptedMessage, correctShift, 'decode');
console.log(`\nПравильная расшифровка: ${decodedMessage}`);

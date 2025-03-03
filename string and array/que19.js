//que-6

// Write a JavaScript function to check whether a given number is prime or not.

let num = 8;
let isPrime = true;

if (num <= 1) {
    isPrime = false;
} else {

    for (let i = 2; i < num; i++) {
        if (num % i === 0) {
            isPrime = false;
            break;
        }
    }
}

if (isPrime) {
    console.log(`${num} is a prime number.`);
} else {
    console.log(`${num} is not a prime number.`);
}

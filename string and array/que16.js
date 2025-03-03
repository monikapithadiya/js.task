//que-3

//Write a JavaScript  code that takes a string as input and counts the number of vowels in it.

let input = "Diwakar";
let vowels = "aeiouAEIOU";
let vowelCount = 0;

for (let i = 0; i < input.length; i++) {
  if (vowels.indexOf(input[i]) !== -1) {
    vowelCount++;
  }
}

console.log(`Number of vowels: ${vowelCount}`);

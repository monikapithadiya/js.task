//que-5

// Given an array of numbers, write JavaScript code to find the maximum, minimum, and average values.

let arr = [22, 33, 2, 7, 99, 54];
let max = arr[0];
let min = arr[0];
let sum = 0;

for (let i = 0; i < arr.length; i++) {
  if (arr[i] > max) max = arr[i];
  if (arr[i] < min) min = arr[i];
  sum += arr[i];
}

let average = sum / arr.length;

console.log(`Maximum Value: ${max}`);
console.log(`Minimum Value: ${min}`);
console.log(`Average Value: ${average}`);
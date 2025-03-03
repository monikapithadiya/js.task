//que-2
//Write a JavaScript code to check if a given string is a palindrome or not.

let str = "racecar";
let isPalindrome = true;


for (let i = 0; i < str.length / 2; i++) {
  if (str[i] !== str[str.length - 1 - i]) 
    {
    isPalindrome = false;
    break;
  }
}

if (isPalindrome) {
  console.log(`${str} is a palindrome.`);
} else {
  console.log(`${str} is not a palindrome.`);
}

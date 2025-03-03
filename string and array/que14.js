//student task
//que-1
//Write a JavaScript  code to reverse a given string and print the reversed string.

let str = "Diwakar";
let reversed = "";
for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
}
console.log(reversed);
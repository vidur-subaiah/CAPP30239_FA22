/* 
This is a javascript example for week 2.
*/

// inline comment

let num = 100; // integer

function foo(){
    let num2 = 200;
};

foo();

let anonFun = function() {
    console.log("hello");
};

let anonFun2 = () => console.log("hello");

 let person="Summer";

function people(peopleName){
    console.log("Hello" + " " + peopleName);
};

people(person);

let arr = ["foo", 123, ["zar", "bar"]];

console.log(arr[1]);

// Set item in array
arr[1] = "barbar";

console.log(arr);

// Add item to the end of an array 
arr.push("car");

console.log(arr);

// Removing an item from the array (index, deleteCount)
arr.splice(2,1);

console.log(arr);

// Looping through an Array
for (let item of arr) {
    console.log(item);
};

for (let i in arr) {
    console.log(i + " " + arr[i]);
};

// Loop through each item in the array with its index 

arr.forEach((item, i) => console.log(i + " " + item));

let object1 = {
    name:"Jill",
    age: 85,
    job: "Cactus Hunter",
};

console.log(object1.name);
console.log(object1["name"]);

object1.job = "Barista";
console.log(object1);

for (let key in object1){
    let value = object1[key];
    console.log(`${key}: ${value}`); // String Literal
};

// For loop using an iterator 

for (let i = 0; i < 10; i++){
    console.log(i);
};

// Conditional flow

let x = 75;

if (x > 50){
    console.log('greater than 50');
}
else if (x > 5) {
    console.log('greater than 5');
}
else {
    console.log('lesser than or equal to 5');
}

// ternary operator (inline if else)
let y = (x > 50)? "Above Average" : "Below Average";

// traverse DOM

let example = document.getElementById("example");

example.innerHTML += "Hello World";


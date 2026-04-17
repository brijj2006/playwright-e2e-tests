let greeting = "Hello World"

greeting = 10

console.log("greeting is: ", greeting)
// greeting is:  10

const APP_URL = "https://hello.world"
// APP_URL = "hello"

console.log("APP_URL : ", APP_URL)

let count = 0
if (true) {
    let count = 10
    console.log("value of count inside if block: ", count)
}
console.log("value of count outside if block: ", count)
// value of count inside if block:  10
// value of count outside if block:  0

var count1 = 0
if (true) {
    var count1 = 10
    console.log("value of count inside if block: ", count1)
}
console.log("value of count outside if block: ", count1)
// value of count inside if block:  10
// value of count outside if block:  10

const count2 = 0
if (true) {
    const count2 = 10
    console.log("value of count inside if block: ", count2)
}
console.log("value of count outside if block: ", count2)
// value of count inside if block:  10
// value of count outside if block:  0

// data Types
// 1. string
// 2. number
// 3. boolean
// 4. object
// 5. Array
// 6. Regexp
// 7. undefined
// 8. null

// String
let str = 'Hello'
let str1 = "hello"

// template literal : ${str}
let str3 = `${str}, World`
console.log(str3)
// Hello, World

// number
let num = 2
let num2 = 5.4

// Boolean
let bool = true

// object
let obj = {}

// array
let arr = []

// regexp
let regex = /abc/

// undefined, null
let val1 = undefined
let val2 = null


console.log(`Type of arr is : ${typeof (arr)}`)
// Type of arr is : object

let str01 = "Hello World"
console.log("length of str01 is : ", str01.length)
// length of str01 is :  11
console.log(str01.charAt(1))
// e

function addNum(num1, num2) {
    let sum = num1 + num2
    return sum
}

let sum = addNum(2, 3)
console.log(sum)

// Any type of data can be provided, no type checking is done in JS which is improved in TS
console.log(addNum("Hello", "World"))

// no check in the number of args passed in JS
console.log(addNum(2))
console.log(addNum(2, 3, 4))
// 5
// HelloWorld
// NaN
// 5

console.log(addNum)
console.log(typeof (addNum))
console.log(typeof (addNum(2, 5)))
// [Function: addNum]
// function
// number

// Anonymous Function
let addTwoNum = function (num1, num2) {
    let sum = num1 + num2
    return sum
}

console.log(addTwoNum(2, 5))

function greet(name, greeting) {
    console.log(`${name}, ${greeting}`)
}

greet("ABC", "Good Morning")

// default value of the parameter
function greet01(name, greeting = "Good Morning") {
    console.log(`${name}, ${greeting}`)
}
greet01("XYZ")
greet01("BCD", "Good Night")
// XYZ, Good Morning
// BCD, Good Night

let mult = function (num1, num2) {
    let num3 = num1 * num2
    console.log(num3)
}

mult(2, 3)

// Rest Parameters
function addNum(num1, num2, ...numN) {
    console.log(arguments.length)
    let total = 0
    for (let i = 0; i < arguments.length; i++) {
        total = total + arguments[i]
    }
    console.log("total : ", total)
}

addNum(2, 3, 4, 5)
// 4
// total :  14


// // Self invoking function
// (function addTwoNum(num1, num2) {
//     let sum = num1 + num2
//     console.log(sum)
//     return sum
// })(4,6)


// Arrow function
let arrow = (num1, num2) => {
    let num3 = num1 + num2;
    console.log("arrow function : ", num3);
    return num3;
};
arrow(4, 7)

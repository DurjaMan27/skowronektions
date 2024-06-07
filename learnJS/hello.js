/* Data Types:
undefined, null, boolean, string, symbol, number, and object
*/
var myName = "Varun"; // throughout program
let ourName = "Varun"; // only used in scope
const thisName = "Varun"; // cannot be changed

var myStr = "I am a \"double quoted\" string inside a \"double quotes\"";
var lastLetter = myName[myName.length - 1];

/***  ESCAPE CHARACTERS
 * \'    single quote
 * \"    double quote"
 * \\    backslash
 * \n    newline
 * \r    carriage return
 * \t    tab
 * \b    backspace
 * \f    form feed
 */

function wordBlanks(myNoun, myAdjective, myVerb, myAdverb) {
    var result = "";
    result += "The " + myAdjective + " " + myNoun + " " + myVerb + " to the store " + myAdjective;
    return result;
}
console.log(wordBlanks("dog", "big", "ran", "quickly"));

var ourArray = ["Stimpson", "J", "cat"];
// select from multi-dimensional array using myArray[0][0];
ourArray.push(["happy", "joy"]); // array is now ["Stimpson", "J", "cat", ["happy", "joy"]]
ourArray.pop() // removes last element of array

ourArray.shift(); // ar4ray now equals ["J", "cat"]
ourArray.unshift("Happy"); // ourArray now equals ["Happy", "J", "cat"]

/***
 * 3 == 3 TRUE
 * 3 == '3' TRUE
 * 3 === 3 TRUE
 * 3 === '3' FALSE
 */

// using switch statements
function caseInSwitch(val) {
    var answer = "";
    switch(val) {
        case 1:
            answer = "alpha";
            break;
        case 2:
            answer = "beta";
            break;
        case 3:
            answer = "gamma";
            break;
        case 4:
        case 5:
        case 6:
            answer = "delta";
            break;
        default:
            answer = "stuff";
            break;
    }
    return answer;
}

var ourDog = {
    "name": "Camper",
    "legs": 4,
    "tails": 1,
    "friends": ["everything!"]
};
console.log(ourDog.name);
console.log(ourDog["name"])
ourDog.name = "Happy Camper"; // change name
ourDog["bark"] = "woof!"; // add property to ourDog object
delete ourDog.bark; // remove bark property

var myStorage = {
    "car": {
        "inside": {
            "glove box": [
                "maps",
                "manuals",
                "mirror"
            ],
            "passenger seat": "crumbs"
        },
        "outside": {
            "trunk": "jack"
        }
    }
};
console.log(myStorage.car.inside["glove box"][0])

// do-while loop
var myArray = [];
var i = 0;
while(i < 5) {
    myArray.push(i);
    i++;
}

do {
    myArray.push(i);
    i++;
} while (i < 5)

// for loop
var ourArray = [];
for ( var i = 0; i < 5; i++) {
    ourArray.push(i);
}

// parseInt() -> converts string to int
function convertToInteger(str) {
    return parseInt(str);
}
// Ternary operator (condition ? statement-if-true : statement-if-false)
function checkEqual(a, b) {
    return a === b ? true : false;
}
function checkSign(num) {
    return num > 0 ? "positive" : num < 0 ? "negative" : "zero";
}


// arrow functions for anonymous functions
const magic = () =>  new Date();
var myConcat = (arr1, arr2) => arr1.concat(arr2);


const realNumberArray = [4, 5.6, -9.8, 3.14, 42, 6, 8.34, -2];
const squareList = (arr) => {
    const squaredIntegers = arr.filter(num => Number.isInteger(num) && num > 0).map(x => x * x);
    return squaredIntegers;
};

// allows you to pass in as many arguments as you want (rest operator)
const sum = (function() {
    return function sum(...args) {
        return args.reduce((a, b) => a + b, 0);
    };
})();
console.log(sum(1, 2, 3, 4)); // returns 10
console.log(sum(1, 2, 3, 6, 7)); // returns 19

// (spread operator) spreads out an array into individual parts
// allows for arr2's contents to be changed without changing arr1 even though they are being set equal (now it only changes the contents)
const arr1 = ['JAN', 'FEB', 'MAR', 'APR', 'MAY'];
let arr2;
(function () {
    arr2 = [...arr1];
    arr1[0] = 'potato';
})();
console.log(arr2);


// using destructuring assignment
const AVG_TEMPERATURES = {
    today: 77.5,
    tomorrow: 79
}

function getTempOfTmrw(avgTemperatures) {
    "use strict";
    const { tomorrow : tempOfTomorrow } = avgTemperatures;

    return tempOfTomorrow;
}

const person = {
    name: "Zodiac Hasbro",
    age: 56
};

const greeting = `Hello, my name is ${person.name}!`

class SpaceShuttle {
    constructor(targetPlanet) {
        this.targetPlanet = targetPlanet;
    }
}
var zeus = new SpaceShuttle('Jupiter');




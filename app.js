"use strict"

const fs = require('fs');
const {Parser, PartialInvalidStringError, EmptyStringError, InvalidStringError} = require("./parser.js");

const arg= process.argv.slice(2);
const fileToRead = arg[0];
const fileToWrite = arg[1];
let newData;
try {
    const data = fs.readFileSync(fileToRead, 'utf8');
    newData = Parser.csvParse(data)
    let numberResult = 0;
        for (let i = 0; i < newData.length; i++) {
            numberResult = (numberResult + newData[i]);
        }
        console.log(numberResult);
} catch (error) {
    if (error instanceof PartialInvalidStringError) {
        console.log(error.message);
        let numberResult = 0;
        for (let i = 0; i < error.array.length; i++) {
            numberResult = (numberResult + error.array[i]);
        }
        console.log(numberResult);
    } else if(error instanceof InvalidStringError){
        console.log(error.message);
    } else if(error instanceof EmptyStringError){
        console.log(error.message);
    }
}


try {
    fs.writeFileSync(fileToWrite, JSON.stringify(newData));
} catch (error) {
    console.log(error);
}
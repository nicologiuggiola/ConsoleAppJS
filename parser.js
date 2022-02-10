class Parser{
    
    static csvParse(string) {
        if (string.length === 0  ) {
            throw new EmptyStringError("Stringa vuota")
        }
        const tempString = Parser.ReplaceAll(string);
        const tempArray = Parser.Splitter(tempString); 
        const newArray = Parser.checkParse(tempArray);
        if (newArray[0].length === 0) {
            throw new InvalidStringError("Stringa Invalida");
        } else if (newArray[0].length > 0 && newArray[1]){
            throw new PartialInvalidStringError("Stringa Parzialmente Valida", newArray[0])
        }
        return newArray[0];
    }

    static ReplaceAll(string){
        let stringNumber = string;
        if (string.includes(",")) {
            return stringNumber.replace(/,/g, ".");
        }
        return stringNumber;
    }

    static Splitter(string){
        return string.split("; ");
    }

    static checkParse(array){
        let newArray = [];
        let flagNaN = false;
        for (let i = 0; i < array.length; i++) {
            let numbers = parseFloat(array[i])
            if (!isNaN(numbers)) {
                newArray.push(numbers);
            } else{
                flagNaN = true;
            }
        }
        let passArray = [newArray, flagNaN]
        return passArray;
    }
}

    class EmptyStringError extends Error{
        constructor(message){
            super(message);
        }
    }
    
    class InvalidStringError extends Error{
        constructor(message){
            super(message);
        }
    }
    
    
    class PartialInvalidStringError extends Error{
    constructor(message, array){
        super(message)
        this.array = array;
    }
    }

module.exports = {Parser, EmptyStringError, InvalidStringError, PartialInvalidStringError};
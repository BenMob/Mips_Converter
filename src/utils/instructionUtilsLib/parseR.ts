
interface RParameters {
    param1 : string,
    param2 : string,
    param3? : string,
    param4? : string,
    min?: boolean,
    mid?: boolean,
    max?: boolean
}

/**
 * Takes a sanitized input for an R format instruction
 * and returns a on bject of elements that should be passed
 * in the Rtype Class as parameters.
 */

function parseR(instructionArray : string[]) : RParameters | null {
    const min = 2;
    const mid = 3;
    const max = 4;
    try {
        if(instructionArray.length === max){
            return {
                param1: instructionArray[0],
                param2: instructionArray[1],
                param3: instructionArray[2],
                param4: instructionArray[3],
                min: false,
                mid: false,
                max: true
            }
        }else if(instructionArray.length === mid){
            return {
                param1: instructionArray[0],
                param2: instructionArray[1],
                param3: instructionArray[2],
                min: false,
                mid: true,
                max: false
            }
        }else if (instructionArray.length === min){
            return {
                param1: instructionArray[0],
                param2: instructionArray[1],
                min: true,
                mid: false,
                max: false
            }
        }  else {
            throw new Error(`Invalid instruction array ${instructionArray}`)
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default parseR;

 interface IParameters{
     param1: string,
     param2: string,
     param3: string,
     param4: string
 }
/**
 * Takes a sanitized input for I format instruction
 * and returns a on bject of elements that should be passed
 * in the Itype Class as parameters.
 */

 function parseI(instructionArray: string[]): IParameters | null{
    const expectedLength = 4;
    try {
        if(instructionArray.length === expectedLength){
            return {
                param1: instructionArray[0],
                param2: instructionArray[1],
                param3: instructionArray[2],
                param4: instructionArray[3]
            }
        }else throw new Error (`Invalid instruction array ${instructionArray}`)
    } catch (error) {
        console.log(error);
        return null;
    }
 }

 export default parseI;
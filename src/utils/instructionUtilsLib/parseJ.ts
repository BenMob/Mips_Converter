
 interface JParameter{
     param1: string,
     param2: string
 }
/**
 * Takes a sanitized input for J format instruction
 * and returns a on bject of elements that should be passed 
 * in the Jtype Class as parameters.
 */

 function parseJ(instructionArray: string[]) : JParameter | null{
    const expectedLength = 2;
    try {
        if (instructionArray.length === expectedLength){
            return {
                param1: instructionArray[0],
                param2: instructionArray[1]
            }
        } else {
            throw new Error(`Invalid instruction array ${instructionArray}`)
        }
    } catch (error) {
        console.log(error)
        return null;
    } 
 }

 export default parseJ;
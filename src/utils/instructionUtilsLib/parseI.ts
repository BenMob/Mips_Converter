
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

    // Extract offset and source register from expression if tje instructionArray is of LW or SW 
    const peelOffset = (expression: string): {offset: string, reg: string} | null =>{
        const openingParenthesis = expression.indexOf('(');
        const closingParenthesis = expression.lastIndexOf(')');
        try {
            if(openingParenthesis && closingParenthesis){
                const offset = expression.substring(0, openingParenthesis);
                const reg = expression.substring(openingParenthesis + 1, closingParenthesis)
                return { offset, reg };
            }else {
                throw new Error(`Invalid expression ${expression}`)
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }   


    const expectedLengthByDefault = 4;
    const expectedLengthForLWandSW = 3
    try {
        if(instructionArray.length === expectedLengthByDefault){
            return {
                param1: instructionArray[0],
                param2: instructionArray[1],
                param3: instructionArray[2],
                param4: instructionArray[expectedLengthByDefault - 1]
            }
        }else if(instructionArray.length === expectedLengthForLWandSW){
            const parsedExpression = peelOffset(instructionArray[expectedLengthForLWandSW - 1]);
     
            if(parsedExpression){
                return {
                   param1: instructionArray[0],
                   param2: instructionArray[1],
                   param3: parsedExpression.reg,
                   param4: parsedExpression.offset
                }
            }else {
                throw new Error(`Invalid expression `);
            }
        }else{
            throw new Error (`Invalid instruction array ${instructionArray}`)
        }
    } catch (error) {
        console.log(error);
        return null;
    }
 }

 export default parseI;
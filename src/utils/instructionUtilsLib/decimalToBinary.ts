import { DecimalSchema } from "./assemblyToDecimal";
import internalErrors from "../../errors/InternalErrors";

export interface BinarySchema {
    name : string,
    value: string | number;
    bits: number;
}


/**
 * converts the array of decimal numbers into binary
 * @param decimal 
 * @param bits 
 */
function decimalToBinary(decimal: Array<DecimalSchema>, bits: Array<number>): Array<BinarySchema> | undefined{

    try {
        if(decimal.length === bits.length){
           let bitIndex = -1;
           const binaryVersion = decimal.map(dec => {
               bitIndex += 1;
               const binary = getValidBits(dec.value.toString(2), bits[bitIndex]);
               return (
                   {
                       name : dec.name,
                       value: binary,
                       bits: bits[bitIndex]
                   }
               )
           })

           return binaryVersion;
        }else{
            throw new Error(internalErrors.ERROR);
        }
    } catch (error) {
        console.warn(error);   
    }
}


/**
 * Returns a version of the binary number formatted in the specified bit.
 * 
 * @param binary mult have less number of bits as the second parameter
 * @param bit 5, 6, 16 or 26 are the only accepted inputs
 */
const getValidBits = (binary: string, bit:number): string => {
    const expectedBits = [5, 6, 16, 26]
    const expectedBit = expectedBits.find(theBit => {
        return theBit === bit;
    }) 

    if(expectedBit){
        let listOfBits = Array.from(binary);
        while(listOfBits.length !== expectedBit){
            listOfBits.unshift("0");
        }
        return listOfBits.join("");
    }else{
        return binary;
    }
}

export default decimalToBinary;
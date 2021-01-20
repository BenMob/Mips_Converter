import { Instruction_i as IInstruction } from "../interfaces/Instruction_i"
import { Itype_i as IItype } from "../interfaces/Itype_i";
import { Jtype_i as IJtype} from "../interfaces/Jtype_i";
import { Rtype_i as IRtype} from "../interfaces/Rtype_i";
import Rtype from "./Rtype";
import Jtype from "./Jtype";
import Itype from "./Itype";
import errorMessages from "../errors/Instruction_e";
import internalErrors from "../errors/InternalErrors";
import operations from "../data/operations.json";
import formats from "../data/formats.json";
import { parseR, parseI, parseJ, assemblyToDecimal, decimalToBinary } from "../utils/instructionUtils";
import { DecimalSchema } from "../utils/instructionUtilsLib/assemblyToDecimal";
import { BinarySchema } from "../utils/instructionUtilsLib/decimalToBinary";

/**
 * This class implements the Instruction_i interface
 *
 * @param: instruction written in assembly | string
 */

class Instruction implements IInstruction{
    static readonly validInstructionLength: number[] = [2,3,4];
    readonly errorMessages = errorMessages;
    private type: IRtype | IItype | IJtype | undefined = undefined;
    private assembly: string = "";
    private decimal: Array<DecimalSchema> | undefined = undefined;
    private binary: Array<BinarySchema> | undefined = undefined;
    private errorMessage : undefined | string = undefined;

    constructor(instruction: string){
        this.assembly = instruction;
    }

    public init() : any {
        return this.validateInstruction(this.assembly)
            .then((validInstruction) => {
                this.convert(validInstruction);
            })
            .catch(error => {
                this.errorMessage = error;
            })
    }

    private validateInstruction = (instruction: string) : Promise<any> => {
        return new Promise((resolve, reject) => {
            if(instruction.length > 50){
                reject(this.errorMessages.INVALID);
                return;
            }else{
                const sanitizedInstruction = this.sanitizeInput(instruction);
                if(!this.inputHasValidLength(sanitizedInstruction)){
                    reject(this.errorMessages.INVALID)
                }
                if (!Instruction.validInstructionLength.includes(sanitizedInstruction.length)){
                    reject(this.errorMessages.INVALID);
                }

                const command = operations.find(operation => operation.instruction === sanitizedInstruction[0])
                if(command){
                    let inputs = undefined;                                        // The parsed input array. 
                    let errorMsg = undefined;                                      // The errorMsg from rType object.
                    switch(command.format){
                        case formats.R:
                            inputs = parseR(sanitizedInstruction);
                            let rType = undefined;                                 // The rType instrucion object.

                            if(inputs){

                                // 1 Register
                                if(inputs.min){
                                    rType = new Rtype(inputs.param1, inputs.param2);
                                    errorMsg = rType.getErrorMessage();
                                    if(errorMsg){
                                        reject(errorMsg);
                                    }else{
                                        resolve(rType);
                                    }
                                    

                                // 2 Registers
                                }else if(inputs.mid){
                                    rType = new Rtype(inputs.param1, inputs.param2, inputs.param3);
                                    errorMsg = rType.getErrorMessage();
                                    if(errorMsg){
                                        reject(errorMsg);
                                    }else{
                                        resolve(rType);
                                    }

                                // 3 Registers
                                }else if(inputs.max){
                                    rType = new Rtype(inputs.param1, inputs.param2, inputs.param3, inputs.param4);
                                    errorMsg = rType.getErrorMessage();
                                    if(errorMsg){
                                        reject(errorMsg);
                                    }else{
                                        resolve(rType);
                                    }

                                // Error
                                } else {
                                    reject(this.errorMessages.INVALID);
                                }

                            }else {
                                reject(this.errorMessages.INVALID);
                            }

                            break;

                        // I Type
                        case formats.I:
                            inputs = parseI(sanitizedInstruction);
                            let iType = undefined;
                            if(inputs) {
                                const immediate = parseInt(inputs.param4)

                                // Immediate is invslid, (i.e not a number)
                                if(immediate === NaN){
                                    reject(this.errorMessages.invalidImmediate(inputs.param4));
                                }

                                iType = new Itype(inputs.param1, inputs.param2, inputs.param3, immediate);
                                errorMsg = iType.getErrorMessage();

                                if(errorMsg){
                                    reject(errorMsg);
                                }else{
                                    resolve(iType);
                                }

                            }else {
                                reject(this.errorMessages.INVALID);
                            }
                            break;
                        
                            // J type
                        case formats.J:
                            inputs = parseJ(sanitizedInstruction);
                            let jType = undefined;

                            if(inputs){
                                const address = parseInt(inputs.param2);
                                if(address === NaN){
                                    reject(this.errorMessages.invalidImmediate(inputs.param2))
                                }else{
                                    jType = new Jtype(inputs.param1, address);
                                    errorMsg = jType.getErrorMessage();

                                    if(errorMsg){
                                        reject(errorMsg);
                                    }else{
                                        resolve(jType);
                                    }  
                                }
                            } else {
                                reject(this.errorMessages.INVALID)
                            }
                            break;
                        default:
                            reject(this.errorMessages.unSupportedOrInvalidCommand(sanitizedInstruction[0]));
                    }
                }else{
                    reject(this.errorMessages.unSupportedOrInvalidCommand(sanitizedInstruction[0]));
                }
            }
        })
    }

    /**
     * Takes input string and turns it into an array where
     * each component of the input is in its own slot.
     * 
     * CATOGORY: INPUT VALIDATION
     * @param input
     */
    private sanitizeInput(input:string): string[]{
        let sanitized = input.trim().split(" ").filter(element => element !== "");
        this.removeCommas(sanitized);
        
        return sanitized;
    }

    /**
     * Takes an input array and verifies if it has a valid
     * length for a mips instruction.
     *
     * CATOGORY: INPUT VALIDATION
     * @param input
     */
    private inputHasValidLength(input: string[]): boolean {
        return Instruction.validInstructionLength.includes(input.length);
    }

    /**
     * Takes an input array and removes all commas in each
     * where they appear.
     * 
     * CATEGORY: INPUT VALIDATION
     * @param input 
     */
    private removeCommas(input: string[]): boolean{

        // Takes a string and removes commas on both sides
        let byeComma = (str: string):string => {
            if(str[0] === ',' && str[str.length - 1] === ','){
                return str.substring(1, str.length - 1);
            }else if(str[0] === ','){
                return str.substring(1, str.length);
            }else if(str[str.length - 1] === ','){
                return str.substring(0, str.length - 1);
            }else{
                return str;
            }
        } 
        
        // Returns true if any of the elements in the array starts or ends with a comma
        let hasComma = (array: string[]) => {
            return array.join('').includes(',');
        }

         switch(input.length){
             case Instruction.validInstructionLength[0]:       // 2 (No Comma should be present therefore nothing is removed)
                if(hasComma(Array.from(input))){
                    this.errorMessage = this.errorMessages.INVALID;
                    return false;
                }else{
                    return true;
                }
             case Instruction.validInstructionLength[1]:       // 3 (remove one comma)
                    input[1] = byeComma(input[1]);
                    input[2] = byeComma(input[2]);
                    return true;
             case Instruction.validInstructionLength[2]:       // 4 (remove two commas)
                    input[1] = byeComma(input[1]);
                    input[2] = byeComma(input[2]);
                    input[3] = byeComma(input[3]);
                    return true;
             default:
                this.errorMessage = this.errorMessages.INVALID;
                return false;
         }
    }

    /**
     * 
     * @param type Converts the values of 
     */
    private convert(type: IRtype | IJtype | IItype) : void{
        this.type = type;

        /**
         *  Note
         * 'this.convertFromAssemblyToDecimal()' must always be called before 
         * 'this.convertFromDecimalToBinary()'because 'this.convertFromDecimalToBinary()' 
         *  uses the value of 'this.decimal', which is set by 
         * 'this.convertFromAssemblyToDecimal()', otherwhise 'this.convertFromDecimalToBinary()'
         *  will return 'undefined'
         */
        this.convertFromAssemblyToDecimal();
        this.convertFromDecimalToBinary();
    }
    
    private convertFromAssemblyToDecimal() : void{
        try {
            const result = assemblyToDecimal(this.type!);
            if(result){
                this.decimal = result;
            }else{
                throw new Error(internalErrors.ERROR);
            }
        } catch (error) {
            console.warn(error);
        }
    }

    /**
     * Converts the 'type' into a DecimalSchema
     */
    private convertFromDecimalToBinary() : void{
        try {
            const result = decimalToBinary(this.getDecimal()!, this.getType()!.bits!);
            if(result){
                this.binary = result
            }else{
                throw new Error(internalErrors.ERROR);
            }
        } catch (error) {
            console.warn(error);
        }
    }

    /* Client Methods */

    public getType(): IItype | IJtype | IRtype | undefined{
        return this.type;
    }

    public getAssembly(): string | undefined{
        return this.assembly;
    }

    public getDecimal(): Array<DecimalSchema> | undefined{
        return this.decimal;
    }

    public getBinary(): Array<BinarySchema> | undefined{
        return this.binary;
    }

    public getErrorMessage(): string | undefined{
        return this.errorMessage;
    }

}

export default Instruction
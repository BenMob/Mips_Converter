import { Instruction_i as IInstruction } from "../interfaces/Instruction_i"
import { Itype_i as IItype } from "../interfaces/Itype_i";
import { Jtype_i as IJtype} from "../interfaces/Jtype_i";
import { Rtype_i as IRtype} from "../interfaces/Rtype_i";
import Rtype from "./Rtype";
import Jtype from "./Jtype";
import Itype from "./Itype";
import errorMessages from "../errors/Instruction_e";
import operations from "../data/operations.json";
import formats from "../data/formats.json";
import { parseR, parseI, parseJ } from "../utils/instructionUtils"

/**
 * This class implements the Instruction_i interface
 *
 * @param: instruction written in assembly | string
 */

class Instruction implements IInstruction{
    readonly validInstructionLength: number[] = [2,3,4];
    private type: IRtype | IItype | IJtype | undefined = undefined;
    private assembly = undefined;
    private decimal = undefined;
    private binary = undefined;
    private errorMessage : undefined | string = undefined;
    readonly errorMessages = errorMessages;

    constructor(instruction : string){
        this.validateInstruction(instruction)
            .then((validInstruction) => {
                //console.log(`Valid Instruction ${JSON.parse(validInstruction)}`)
                this.init(validInstruction);
            })
            .catch(error => {
                this.errorMessage = error.message;
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
                if (!this.validInstructionLength.includes(sanitizedInstruction.length)){
                    reject(this.errorMessages.INVALID);
                    return;
                }

                const command = operations.find(operation => operation.instruction === sanitizedInstruction[0])
                if(command){
                    let inputs = null;
                    switch(command.format){
                        case formats.R:
                            inputs = parseR(sanitizedInstruction);
                            if(inputs){

                                // 1 Register
                                if(inputs.min){
                                    resolve(new Rtype(inputs.param1, inputs.param2));

                                // 2 Registers
                                }else if(inputs.mid){
                                    resolve(new Rtype(inputs.param1, inputs.param2, inputs.param3))

                                //3 Registers
                                }else if(inputs.max){
                                    resolve(new Rtype(inputs.param1, inputs.param2, inputs.param3, inputs.param4))

                                // Error
                                } else {
                                    reject(this.errorMessages.INVALID);
                                }

                            }else {
                                reject(this.errorMessages.INVALID);
                            }

                            break;
                        case formats.I:
                            inputs = parseI(sanitizedInstruction);

                            if(inputs) {
                                const immediate = parseInt(inputs.param4)
                                if(immediate === NaN){
                                    reject(this.errorMessages.invalidImmediate(inputs.param4));
                                }
                                resolve(new Itype(inputs.param1, inputs.param2, inputs.param3, immediate));
                            }else reject(this.errorMessages.INVALID);
                            break;

                        case formats.J:
                            inputs = parseJ(sanitizedInstruction);
                            if(inputs){
                                const address = parseInt(inputs.param2);
                                if(address === NaN){
                                    reject(this.errorMessages.invalidImmediate(inputs.param2))
                                }else{
                                    resolve(new Jtype(inputs.param1, address))
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
        return this.validInstructionLength.includes(input.length);
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
             case this.validInstructionLength[0]:       // 2 (No Comma should be present therefore nothing is removed)
                if(hasComma(Array.from(input))){
                    this.errorMessage = this.errorMessages.INVALID;
                    return false;
                }else{
                    return true;
                }
             case this.validInstructionLength[1]:       // 3 (remove one comma)
                    input[1] = byeComma(input[1]);
                    input[2] = byeComma(input[2]);
                    return true;
             case this.validInstructionLength[2]:       // 4 (remove two commas)
                    input[1] = byeComma(input[1]);
                    input[2] = byeComma(input[2]);
                    input[3] = byeComma(input[3]);
                    return true;
             default:
                this.errorMessage = this.errorMessages.INVALID;
                return false;
         }
    }

    private init(type: IRtype | IJtype | IItype) : void{
        this.type = type
        // Calls assembly to decimal to initialize decimal
        // Calls decimal to binary to initialize binary
    }

    private assemblyToDecimal() : void{
        // Changes each assembly component of the instruction to decimal number
    }

    private decimalToBinary() : void{
        // Changes each decimal number of the instruction to assembly
    }

    public getType(): IItype | IJtype | IRtype | undefined{
        return this.type;
    }

    public getAssembly(): string | undefined{
        return this.assembly;
    }

    public getDecimal(): string | undefined{
        return this.decimal;
    }

    public getBinary(): string | undefined{
        return this.binary;
    }

    public getErrorMessage(): string | undefined{
        return this.errorMessage;
    }

}

export default Instruction
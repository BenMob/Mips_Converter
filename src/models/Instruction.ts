import { Instruction_i as IInstruction } from "../interfaces/Instruction_i"
import { Itype_i as IItype } from "../interfaces/Itype_i";
import { Jtype_i as IJtype} from "../interfaces/Jtype_i";
import { Rtype_i as IRtype} from "../interfaces/Rtype_i";
import errorMessages from "../errors/Instruction_e";
import operations from "../data/operations.json";
import formats from "../data/formats.json";

/**
 * This class implements the Instruction_i interface
 *
 * @param: instruction written in assembly | string
 */

class Instruction implements IInstruction{
    private validInstructionLength: number[] = [2,3,4];
    private type = undefined;
    private assembly = undefined;
    private decimal = undefined;
    private binary = undefined;
    private errorMessage = undefined;
    readonly errorMessages = errorMessages;

    constructor(instruction : string){
        this.validateInstruction(instruction)
            .then((validInstruction) => {
                this.init(validInstruction);
            })
            .catch(error => {
                this.errorMessage = error.message;
            })
    }

    private validateInstruction = (instruction: string) : Promise<string> => {
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
                    switch(command.format){
                        case formats.R:
                            // Verify valid registers and immediates etc ...
                            // resolve(new Rtype(sanitizedInstruction));
                            break;
                        case formats.I:
                            // Verify valid registers and immediates etc ...
                            // resolve(new Itype(sanitizedInstruction));
                            break;
                        case formats.J:
                            // Verify valid registers and immediates etc ...
                            // resolve(new Jtype(sanitizedInstruction));
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
     * CATOGORY: INPUT VALIDATION
     * @param input
     */
    private sanitizeInput(input:string): string[] {
        return input.trim().split(" ").filter(element => element !== "");
    }

    /**
     * Takes an input aray and verifies if it has a valid
     * length for a mips instruction.
     *
     * CATOGORY: INPUT VALIDATION
     * @param input
     */
    private inputHasValidLength(input: string[]): boolean {
        return this.validInstructionLength.includes(input.length);
    }

    private init(instruction: string) : void{
        // Initializes type
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
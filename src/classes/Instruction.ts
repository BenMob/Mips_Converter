import { Instruction_i } from "../interfaces/Instruction_i"
import { Itype_i } from "../interfaces/Itype_i";
import { Jtype_i } from "../interfaces/Jtype_i";
import { Rtype_i } from "../interfaces/Rtype_i";
import { error_messages } from "../errors/Instruction_e";
import operations from "../data/operations.json";

/**
 * This class implements the Instruction_i interface
 *
 * @param: instruction written in assembly | string
 */

class Instruction implements Instruction_i{
    private type = undefined;
    private assembly = undefined;
    private decimal = undefined;
    private binary = undefined;
    private errorMessage = null;
    readonly error_messages = error_messages;

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
        reject("Error: Instruction is tool long, try again!");
        return;
            }else{
                const i = instruction.trim() .split(" ").filter(element => element !== "");
                console.log(i)
                if (![2,3,4].includes(i.length)){
                    reject("Invalid instruction. try again!");
                    return
                }

                const command = operations.find(operation => operation.instruction === i[0])
                if(command){
                    switch(command.format){
                        case "R":
                            // DO something
                            break;
                        case "I":
                            // Do something
                            break;
                        case "J":
                            // Do something
                            break;
                        default:
                    }
                }
            }
        })
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

    public getType(): Itype_i | Jtype_i | Rtype_i | undefined{
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

    public getErrorMessage(): string | null{
        return this.errorMessage;
    }

}

export default Instruction
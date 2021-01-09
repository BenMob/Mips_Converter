import { Instruction_i } from "../interfaces/Instruction_i"
import { Itype_i } from "../interfaces/Itype_i";
import { Jtype_i } from "../interfaces/Jtype_i";
import { Rtype_i } from "../interfaces/Rtype_i";
/**
 * This class implements the Instruction_i interface 
 * 
 * @param: instruction written in assembly | string
 * 
 */

class Instruction implements Instruction_i{
    readonly type = undefined;
    readonly assembly = undefined;
    readonly decimal = undefined;
    readonly binary = undefined;

    constructor(instruction : string){
        // Calls Init
    }

    private init() : void{
        // Insures valid input 
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
}

export default Instruction
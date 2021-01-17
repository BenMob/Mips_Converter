import { Jtype_i as JInterface } from "../interfaces/Jtype_i";
import formats from "../data/formats.json";
import { OperationsQueries } from "../utils/dataUtils";
import ErrorMessages from "../errors/Instruction_e";

class Jtype implements JInterface{
    readonly length: number = 2;
    readonly bits: number[] = [ 6, 26 ];
    readonly op: number = 0;
    readonly format: string = formats.J;
    public instruction: string = "";
    public address: string | number = "";
    readonly errorMessages = ErrorMessages;
    private errorMessage : undefined | string = undefined;


    constructor(instruction: string, address: number | string){
        try {
            const command = OperationsQueries.getOperationByInstruction(instruction);
            if(command){
                this.instruction = instruction;
                this.address = address;
                this.op = command.op;
            } else { 
                this.errorMessage = this.errorMessages.unSupportedOrInvalidCommand(instruction);
                throw new Error(this.errorMessage);
            }
        } catch (error) {
            console.warn(error);
        }

    }

    // Returns the error message if there is one.
    public getErrorMessage(): string | undefined{
        return this.errorMessage;
    }
}

export default Jtype;
import { Itype_i as IIntereface } from "../interfaces/Itype_i";
import formats from "../data/formats.json";
import registers from "../data/registers.json";
import addresses from "../data/addresses.json";
import { OperationsQueries } from "../utils/dataUtils";
import ErrorMessages from "../errors/Instruction_e";

class Itype implements IIntereface{
    readonly length : number = 4;
    readonly bits: number[] = [6,5,5,16];
    readonly format: string = formats.I;
    public instruction: string | undefined = undefined;
    public op: number | undefined = undefined;
    public rs: number | undefined = undefined;
    public rt: number | undefined = undefined;
    public immediate: number | undefined = undefined;
    readonly errorMessages = ErrorMessages;
    private errorMessage : undefined | string = undefined;    

    /**
     *
     * @param instruction
     * @param op
     * @param rs
     * @param rt
     * @param immediate
     */
    constructor(instruction: string, rt: string, rs: string, immediate: number){
        try {
            // Validate Instruction and Op Code
            const command : any =  OperationsQueries.getOperationByInstruction(instruction);

            if(command){
                this.instruction = command.instruction;
                this.op = command.op;
            } else { 
                this.errorMessage = this.errorMessages.unSupportedOrInvalidCommand(instruction);
                throw new Error(this.errorMessage);
            }

            // Validate rs
            const rsRegister = registers.find(register => register.assembly_name === rs);
            if(rsRegister){
                this.rs = rsRegister.number;
            }else {
                this.errorMessage = this.errorMessages.unSupportedOrInvalidRegister(rs);
                throw new Error(this.errorMessage);
            }

            // Validate rt
            const rtRegister = registers.find(register => register.assembly_name === rt);
            if(rtRegister){
                this.rt = rtRegister.number;
            }else {
                this.errorMessage = this.errorMessages.unSupportedOrInvalidRegister(rt);
                throw new Error(this.errorMessage);
            }

            // validate Immediate
            if(immediate >= addresses.MIN && immediate <= addresses.MAX){
                this.immediate = immediate;
            }else{ 
                this.errorMessage = this.errorMessages.IMMEDIATE_OUT_OF_RANGE
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

export default Itype;
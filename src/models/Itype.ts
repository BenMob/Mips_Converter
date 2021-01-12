import { Itype_i as IIntereface } from "../interfaces/Itype_i";
import formats from "../data/formats.json";
import operations from "../data/operations.json";
import registers from "../data/registers.json";
import addresses from "../data/addresses.json";
import { OperationsQueries } from "../utils/dataUtils";

class Itype implements IIntereface{
    readonly length : number = 4;
    readonly bits: number[] = [6,5,5,16];
    readonly format: string = formats.I;
    public instruction: string | undefined = undefined;
    public op: number | undefined = undefined;
    public rs: number | undefined = undefined;
    public rt: number | undefined = undefined;
    public immediate: number | undefined = undefined;

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
            this.instruction = instruction;

            // Validate Instruction and Op Code
            const command : any =  OperationsQueries.getOperationByInstruction(instruction);

            if(command){
                this.op = command.op;
            }else throw new Error(`Invalid or unsupported instruction ${instruction}`);

            // Validate rs
            const rsRegister = registers.find(register => register.assembly_name === rs);
            if(rsRegister){
                this.rs = rsRegister.number;
            }else throw new Error(`Invalid or unsupported register ${rs}`);

            // Validate rt
            const rtRegister = registers.find(register => register.assembly_name === rt);
            if(rtRegister){
                this.rt = rtRegister.number;
            }else throw new Error(`Invalid or unsupported register ${rt}`);

            // vAlidate Immediate
            if(immediate >= addresses.MIN && immediate <= addresses.MAX){
                this.immediate = immediate;
            }else throw new Error(`Immediates must be between ${addresses.MIN} and ${addresses.MAX}`);

        } catch (error) {
            console.log(error);
        }
    }
}

export default Itype;
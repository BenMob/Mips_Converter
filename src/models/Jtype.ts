import { Jtype_i as JInterface } from "../interfaces/Jtype_i";
import formats from "../data/formats.json";
import { OperationsQueries } from "../utils/dataUtils";

class Jtype implements JInterface{
    readonly length: number = 2;
    readonly bits: number[] = [ 6, 26 ];
    readonly op: number = 0;
    readonly format: string = formats.J;
    public instruction: string = "";
    public address: string | number = "";

    constructor(instruction: string, address: number | string){
        try {
            const command = OperationsQueries.getOperationByInstruction(instruction);
            if(command){
                this.instruction = instruction;
                this.address = address;
                this.op = command.op;
            }else throw new Error(`Invalid or Unsupported instruction ${instruction}`)
        } catch (error) {
            console.log(error);
        }

    }
}

export default Jtype;
import { Jtype_i as JInterface } from "../interfaces/Jtype_i";
import formats from "../data/formats.json";

class Jtype implements JInterface{
    readonly length: number = 2;
    readonly bits: number[] = [ 6, 26 ];
    readonly op: number = 0;
    readonly format: string = formats.J;
    public instruction: string = "";
    public address: string | number = "";

    constructor(instruction: string, address: number | string){
        this.instruction = instruction;
        this.address = address;
    }
}

export default Jtype;
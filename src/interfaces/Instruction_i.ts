import { Itype_i } from "./Itype_i";
import { Jtype_i } from "./Jtype_i";
import { Rtype_i } from "./Rtype_i";

export interface Instruction_i{
    readonly type: Itype_i | Jtype_i | Rtype_i | undefined,
    readonly assembly: Array<string> | undefined,
    readonly decimal: Array<string> | undefined,
    readonly binary: Array<string> | undefined,

    /*****  Implementation Details *****/
    // init(instruction: string): void,
    // assemblyToDecimal(): void,
    // decimalToBinary(): void,
}
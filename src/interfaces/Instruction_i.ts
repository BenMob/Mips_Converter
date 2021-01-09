import { Itype_i } from "./Itype_i";
import { Jtype_i } from "./Jtype_i";
import { Rtype_i } from "./Rtype_i";

export interface Instruction_i{
    getType(): Itype_i | Jtype_i | Rtype_i | undefined
    getAssembly(): string | undefined;
    getDecimal(): string | undefined;
    getBinary(): string | undefined;
    getErrorMessage(): string | null

    /*****  Implementation Details *****/
    // init(instruction: string): void,
    // assemblyToDecimal(): void,
    // decimalToBinary(): void,
}
import { Itype_i } from "./Itype_i";
import { Jtype_i } from "./Jtype_i";
import { Rtype_i } from "./Rtype_i";
import { DecimalSchema } from "../utils/instructionUtilsLib/assemblyToDecimal";
import { BinarySchema } from "../utils/instructionUtilsLib/decimalToBinary";

export interface Instruction_i{
    getType(): Itype_i | Jtype_i | Rtype_i | undefined
    getAssembly(): string | undefined;
    getDecimal(): DecimalSchema | undefined;
    getBinary(): BinarySchema | undefined;
    getErrorMessage(): string | undefined;

    /*****  Implementation Details *****/
    // init(instruction: string): void,
    // assemblyToDecimal(): void,
    // decimalToBinary(): void,
}
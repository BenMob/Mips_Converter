/**
 * These are some manuel helper functions and variables 
 * to facilitate testing.
 */
import { Rtype_i } from "../src/interfaces/Rtype_i";
import { Itype_i } from "../src/interfaces/Itype_i";
import { Jtype_i } from "../src/interfaces/Jtype_i";


/**
 * Sample Inputs
 */
export enum inputs{
    R_TYPE_ADD = "add $t0, $s1, $s2",
    R_TYPE_MULT = "mult $s3, $s4",
    R_TYPE_MFHI = "mfhi $s1",
    R_TYPE_JR = "jr $ra",
    I_TYPE_ADDI = "addi $s5, $s6, 50",
    I_TYPE_LW = "lw $t0, 32($s3)",
    I_TYPE_SW = "sw $t0, 32($s3)",
    J_TYPE_J = "j 0xc1c4"
}

/******
 * Returns 'true' if 'actual' is defined and is the same as 'expected, otherwise, returns false.
 * Intented to be used with 'I' format instructions.
 * @param actual 
 * @param expected 
 */
export function isRtype(actual: Rtype_i | undefined, expected: Rtype_i): boolean{
    if (!actual){
        return false;
    }
    return (
            actual.instruction === expected.instruction &&
            actual.format === expected.format &&
            actual.op === expected.op &&
            actual.rs === expected.rs &&
            actual.rt === expected.rt &&
            actual.rd === expected.rd &&
            actual.shift_amount === expected.shift_amount &&
            actual.func === expected.func
        )
}

/**
 * Returns 'true' if 'actual' is defined and is the same as 'expected, otherwise, returns false.
 * Intented to be used with 'I' format instructions.
 * @param actual 
 * @param expected 
 */

export function isItype(actual: Itype_i | undefined, expected: Itype_i): boolean{
    // TODO: implement this
    return false;
}

/**
 * Returns 'true' if 'actual' is defined and is the same as 'expected, otherwise, returns false.
 * Intented to be used with 'J' format instructions.
 * @param actual 
 * @param expected 
 */

export function isJtype(actual: Jtype_i | undefined, expected: Jtype_i): boolean{
    // TODO: implement this
    return false;
}


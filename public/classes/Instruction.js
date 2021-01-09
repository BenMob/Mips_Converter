"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This class implements the Instruction_i interface
 *
 * @param: instruction written in assembly | string
 *
 */
var Instruction = /** @class */ (function () {
    function Instruction(instruction) {
        this.type = undefined;
        this.assembly = undefined;
        this.decimal = undefined;
        this.binary = undefined;
        // Calls Init
    }
    Instruction.prototype.init = function () {
        // Insures valid input 
        // Initializes type
        // Calls assembly to decimal to initialize decimal
        // Calls decimal to binary to initialize binary
    };
    Instruction.prototype.assemblyToDecimal = function () {
        // Changes each assembly component of the instruction to decimal number
    };
    Instruction.prototype.decimalToBinary = function () {
        // Changes each decimal number of the instruction to assembly
    };
    return Instruction;
}());
exports.default = Instruction;

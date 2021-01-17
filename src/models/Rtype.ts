import { Rtype_i as RInterface } from "../interfaces/Rtype_i";
import formats from "../data/formats.json";
import { OperationsQueries, RegistersQueries } from "../utils/dataUtils";
import ErrorMessages from "../errors/Instruction_e"

class Rtype implements RInterface{
    readonly length = 5;
    readonly bits = [6,5,5,5,5,6];
    readonly op = 0;
    readonly format = formats.R;
    readonly shiftAmount = 0;
    public instruction: string | undefined = undefined;
    public rs = 0;
    public rt = 0;
    public rd = 0;
    public func = 0;
    readonly errorMessages = ErrorMessages;
    private errorMessage : undefined | string = undefined;

    /**
     *
     * @param instruction
     */
    constructor(instruction:string, rd:string, rs?: string, rt?:string){
        try {
            const command = OperationsQueries.getOperationByInstruction(instruction);

            if(command){
                this.instruction = command.instruction;
                if(rd && rs && rt){
                    this.threeReg(instruction, rd, rs, rt)
                }else if(rd && rs){
                    this.twoReg(instruction ,rd, rs);
                }else if(rd){
                    this.oneReg(instruction, rd)       // Yes, if only two params are given 'rs' is considered as 'rd'
                }else {
                    this.errorMessage = this.errorMessages.MISSING_REGISTER
                    throw new Error(this.errorMessage)
                }
            } else{
                this.errorMessage = this.errorMessages.MISSING_OPERATION;
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

    /**
     *
     * @param instruction
     * @param rs
     * @param rt
     * @param rd
     */
    private threeReg(instruction: string, rd: string, rs: string, rt:string) : void{
        try {
            const command = OperationsQueries.getOperationByInstruction(instruction);
            if(command){
                // func
                this.func = command.func;

                // rs
                const rsRegister = RegistersQueries.getRegisterByName(rs);
                if(rsRegister){
                    this.rs = rsRegister.number;
                }else {
                    this.errorMessage = this.errorMessages.unSupportedOrInvalidRegister(rs);
                    throw new Error(this.errorMessage);
                }

                // rt
                const rtRegister = RegistersQueries.getRegisterByName(rt);
                if(rtRegister){
                    this.rt = rtRegister.number;
                }else {
                    this.errorMessage = this.errorMessages.unSupportedOrInvalidRegister(rt);
                    throw new Error(this.errorMessage);
                }

                // rd
                const rdRegister = RegistersQueries.getRegisterByName(rd);
                if(rdRegister){
                    this.rd = rdRegister.number;
                }else {
                    this.errorMessage = this.errorMessages.unSupportedOrInvalidRegister(rd);
                    throw new Error(this.errorMessage);
                }

            } else{
                this.errorMessage = this.errorMessages.unSupportedOrInvalidCommand(instruction);
                throw new Error(this.errorMessage);
            }
        } catch (error) {
            console.warn(error);
        }
    }

    /**
     *
     * @param instruction
     * @param rs
     * @param rt
     */
    private twoReg(instruction: string, rs: string, rt: string): void{
        try {
            const command = OperationsQueries.getOperationByInstruction(instruction);
            if(command){
                // func
                this.func = command.func;

                // rs
                const rsRegister = RegistersQueries.getRegisterByName(rs);
                if(rsRegister){
                    this.rs = rsRegister.number;
                }else {
                    this.errorMessage = this.errorMessages.unSupportedOrInvalidRegister(rs);
                    throw new Error(this.errorMessage);
                }

                // rt
                const rtRegister = RegistersQueries.getRegisterByName(rt);
                if(rtRegister){
                    this.rt = rtRegister.number;
                }else {
                    this.errorMessage = this.errorMessages.unSupportedOrInvalidRegister(rt);
                    throw new Error(this.errorMessage);
                }

            } else {
                this.errorMessage = this.errorMessages.unSupportedOrInvalidCommand(instruction);
                throw new Error(this.errorMessage);
            }
        } catch (error) {
            console.warn(error);
        }
    }

    /**
     *
     * @param instruction
     * @param rd
     */
    private oneReg(instruction: string, rs: string): void{
        try {
            const command = OperationsQueries.getOperationByInstruction(instruction);
            if(command){
                // func
                this.func = command.func;

                // rs
                if(instruction === "jr" && rs === "$ra"){
                    this.rs = 31;
                    return;
                }else if(rs === "$ra"){
                    this.errorMessage = this.errorMessages.invalidRegisterForJR(rs);
                    throw new Error(this.errorMessage);
                }else{
                    const rsRegister = RegistersQueries.getRegisterByName(rs);
                    if(rsRegister){
                        this.rd = rsRegister.number;
                    }else {
                        this.errorMessage = this.errorMessages.unSupportedOrInvalidRegister(rs);
                        throw new Error(this.errorMessage);
                    }
                }

            } else {
                this.errorMessage = this.errorMessages.unSupportedOrInvalidCommand(instruction);
                throw new Error(this.errorMessage);
            }
        } catch (error) {
            console.warn(error);
        }
    }
}

export default Rtype;
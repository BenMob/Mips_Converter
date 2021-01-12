import { Rtype_i as RInterface } from "../interfaces/Rtype_i";
import formats from "../data/formats.json";
import {OperationsQueries, RegistersQueries } from "../utils/dataUtils";

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

    /**
     *
     * @param instruction
     */
    constructor(instruction:string, rs:string, rt?: string, rd?:string){
        try {
            if(rs && rt && rd){
                this.threeReg(instruction,rs, rt, rd)
            }else if(rs && rt){
                this.twoReg(instruction ,rs, rt);
            }else if(rs){
                this.oneReg(instruction, rs)       // Yes, if only two params are given 'rs' is considered as 'rd'
            }else throw new Error("Missing Registers")
        } catch (error) {
            console.log(error);
        }
    }

    /**
     *
     * @param instruction
     * @param rs
     * @param rt
     * @param rd
     */
    private threeReg(instruction: string, rs: string, rt: string, rd:string) : void{
        try {
            const command = OperationsQueries.getOperationByInstruction(instruction);
            if(command){
                // rs
                const rsRegister = RegistersQueries.getRegisterByName(rs);
                if(rsRegister){
                    this.rs = rsRegister.number;
                }else throw new Error(`Invalid or Unsupported Register ${rs}`)

                // rt
                const rtRegister = RegistersQueries.getRegisterByName(rt);
                if(rtRegister){
                    this.rt = rtRegister.number;
                }else throw new Error(`Invalid or Unsupported Register ${rt}`)

                // rd
                const rdRegister = RegistersQueries.getRegisterByName(rd);
                if(rdRegister){
                    this.rd = rdRegister.number;
                }else throw new Error(`Invalid or Unsupported Register ${rd}`);

            } else throw new Error(`Invalid or Unsupported instruction ${instruction}`)
        } catch (error) {
            console.log(error);
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
                // rs
                const rsRegister = RegistersQueries.getRegisterByName(rs);
                if(rsRegister){
                    this.rs = rsRegister.number;
                }else throw new Error(`Invalid or Unsupported Register ${rs}`)

                // rt
                const rtRegister = RegistersQueries.getRegisterByName(rt);
                if(rtRegister){
                    this.rt = rtRegister.number;
                }else throw new Error(`Invalid or Unsupported Register ${rt}`)

            } else throw new Error(`Invalid or Unsupported instruction ${instruction}`)
        } catch (error) {
            console.log(error);
        }
    }

    /**
     *
     * @param instruction
     * @param rd
     */
    private oneReg(instruction: string, rd: string): void{
        try {
            const command = OperationsQueries.getOperationByInstruction(instruction);
            if(command){
                // rd
                const rdRegister = RegistersQueries.getRegisterByName(rd);
                if(rdRegister){
                    this.rd = rdRegister.number;
                }else throw new Error(`Invalid or Unsupported Register ${rd}`);

            } else throw new Error(`Invalid or Unsupported instruction ${instruction}`)
        } catch (error) {
            console.log(error);
        }
    }
}

export default Rtype;
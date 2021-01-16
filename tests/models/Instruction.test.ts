import Instruction from "../../src/models/Instruction";
import operations from "../../src/data/operations.json";
import registers from "../../src/data/registers.json";
import { Rtype_i } from "../../src/interfaces/Rtype_i";
import { Itype_i } from "../../src/interfaces/Itype_i";
import { Jtype_i } from "../../src/interfaces/Jtype_i";
import {inputs, isRtype, isItype, isJtype } from "../helpers"

describe("Instruction Class", () => {
    const rTypeAdd = new Instruction(inputs.R_TYPE_ADD);
    const rTypeMult = new Instruction(inputs.R_TYPE_MULT);
    const rTypeMfhi = new Instruction(inputs.R_TYPE_MFHI);
    const rTypeJr = new Instruction(inputs.R_TYPE_JR);
    const iTypeAddi = new Instruction(inputs.I_TYPE_ADDI);
    const iTypeLw = new Instruction(inputs.I_TYPE_LW);
    const iTypeSw = new Instruction(inputs.I_TYPE_LW);
    const jTypeJ = new Instruction(inputs.J_TYPE_J);

    /**
     *  Test init() on the "add" operation. 
     */
    it("init() method initializes 'type' attribute correctly on 'add' operation", () => {

        const add : any = operations.find(operation => operation.instruction === "add");
        const t0 : any = registers.find(register => register.assembly_name === "$t0");
        const s1 : any = registers.find(register => register.assembly_name === "$s1");
        const s2 : any = registers.find(register => register.assembly_name === "$s2");
 
        expect(isRtype(rTypeAdd.getType() as Rtype_i, {
            instruction: add.instruction,
            format: add.format,
            op: add.op,
            rs: s1.number,
            rt: s2.number,
            rd: t0.number,
            shiftAmount: add.shiftAmount,
            func: add.func
        })).toBe(true);
    })

    /**
     *  Test init() on the "mult" operation. 
     */
    it("init() method initializes 'type' attribute correctly on 'mult' operation", () => {

        const mult : any = operations.find(operation => operation.instruction === "mult");
        const s3 : any = registers.find(register => register.assembly_name === "$s3");
        const s4 : any = registers.find(register => register.assembly_name === "$s4");
        
        expect(isRtype(rTypeMult.getType() as Rtype_i, {
            instruction: mult.instruction,
            format: mult.format,
            op: mult.op,
            rs: s3.number,
            rt: s4.number,
            rd: mult.rd,
            shiftAmount: mult.shiftAmount,
            func: mult.func
        })).toBe(true);
    })

    /**
     *  Test init() on the "mfhi" operation. 
     */
   it("init() method initializes 'type' attribute correctly on 'mfhi' operation", () => {

        const mfhi : any = operations.find(operation => operation.instruction === "mfhi");
        const s1 : any = registers.find(register => register.assembly_name === "$s1");
        
        expect(isRtype(rTypeMfhi.getType() as Rtype_i, {
            instruction: mfhi.instruction,
            format: mfhi.format,
            op: mfhi.op,
            rs: mfhi.rs,
            rt: mfhi.rt,
            rd: s1.number,
            shiftAmount: mfhi.shiftAmount,
            func: mfhi.func
        })).toBe(true);
    })    

    /**
     *  Test init() on the "jr $ra" operation. 
     */
   it("init() method initializes 'type' attribute correctly on 'jr $ra' operation", () => {

        const jr : any = operations.find(operation => operation.instruction === "jr");
        const ra : any = registers.find(register => register.assembly_name === "$ra");

        expect(isRtype(rTypeJr.getType() as Rtype_i, {
            instruction: jr.instruction,
            format: jr.format,
            op: jr.op,
            rs: ra.number,
            rt: jr.rt,
            rd: jr.rt,
            shiftAmount: jr.shiftAmount,
            func: jr.func
        })).toBe(true);
    })    

    /**
     *  Test init() on the "jr $ra" operation. 
     */
   it("init() method initializes 'type' attribute correctly on 'addi' operation", () => {

        const addi : any = operations.find(operation => operation.instruction === "addi");
        const s5 : any = registers.find(register => register.assembly_name === "$s5");
        const s6 : any = registers.find(register => register.assembly_name === "$s6");
        
        expect(isItype(iTypeAddi.getType() as Itype_i, {
            instruction: addi.instruction,
            format: addi.format,
            op: addi.op,
            rs: s6.number,
            rt: s5.number,
            immediate: 50,
        })).toBe(true);
    }) 
    
    /**
     *  Test init() on the "lw" operation. 
     */
   it("init() method initializes 'type' attribute correctly on 'lw' operation", () => {

        const lw : any = operations.find(operation => operation.instruction === "lw");
        const s3 : any = registers.find(register => register.assembly_name === "$s3");
        const t0 : any = registers.find(register => register.assembly_name === "$t0");
        
        expect(isItype(iTypeLw.getType() as Itype_i, {
            instruction: lw.instruction,
            format: lw.format,
            op: lw.op,
            rs: s3.number,
            rt: t0.number,
            immediate: 32,
        })).toBe(true);
    }) 

    /**
     *  Test init() on the "sw" operation. 
     */
   it("init() method initializes 'type' attribute correctly on 'sw' operation", () => {

        const sw : any = operations.find(operation => operation.instruction === "sw");
        const s3 : any = registers.find(register => register.assembly_name === "$s3");
        const t0 : any = registers.find(register => register.assembly_name === "$t0");
        
        expect(isItype(iTypeSw.getType() as Itype_i, {
            instruction: sw.instruction,
            format: sw.format,
            op: sw.op,
            rs: s3.number,
            rt: t0.number,
            immediate: 32,
        })).toBe(true);
    }) 

    /**
     *  Test init() on the "j" operation. 
     */
   it("init() method initializes 'type' attribute correctly on 'j' operation", () => {

        const j = operations.find(operation => operation.instruction === "j")!;
        expect(isJtype(jTypeJ.getType() as Jtype_i, {
            instruction: j.instruction,
            format: j.format,
            op: j.op,
            address: 49604
        })).toBe(true);
    })
})
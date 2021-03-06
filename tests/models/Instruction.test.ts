import Instruction from "../../src/models/Instruction";
import operations from "../../src/data/operations.json";
import registers from "../../src/data/registers.json";
import { Rtype_i } from "../../src/interfaces/Rtype_i";
import { Itype_i } from "../../src/interfaces/Itype_i";
import { Jtype_i } from "../../src/interfaces/Jtype_i";
import {inputs, isRtype, isItype, isJtype, isExpectedDecimalSchema, isExpectedBinarySchema } from "../helpers"

describe("Instruction Class", () => {
    const rTypeAdd = new Instruction(inputs.R_TYPE_ADD);
    rTypeAdd.init();

    const rTypeMult = new Instruction(inputs.R_TYPE_MULT);
    rTypeMult.init();

    const rTypeMfhi = new Instruction(inputs.R_TYPE_MFHI);
    rTypeMfhi.init();

    const rTypeJr = new Instruction(inputs.R_TYPE_JR);
    rTypeJr.init();

    const iTypeAddi = new Instruction(inputs.I_TYPE_ADDI);
    iTypeAddi.init();

    const iTypeLw = new Instruction(inputs.I_TYPE_LW);
    iTypeLw.init();

    const iTypeSw = new Instruction(inputs.I_TYPE_SW);
    iTypeSw.init();

    const jTypeJHex = new Instruction(inputs.J_TYPE_J_HEX);
    jTypeJHex.init();

    const jTypeJDec = new Instruction(inputs.J_TYPE_J_DECIMAL);
    jTypeJDec.init();


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
            rd: jr.rd,
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
   it("init() method initializes 'type' attribute correctly on 'j' operation with hexadecimal address", () => {

        const j = operations.find(operation => operation.instruction === "j")!;
  
        expect(isJtype(jTypeJHex.getType() as Jtype_i, {
            instruction: j.instruction,
            format: j.format,
            op: j.op,
            address: 49604
        })).toBe(true);
    })

    /**
     *  Test init() on the "j" operation. 
     */
   it("init() method initializes 'type' attribute correctly on 'j' operation with decimal address", () => {

        const j = operations.find(operation => operation.instruction === "j")!;
        
        expect(isJtype(jTypeJDec.getType() as Jtype_i, {
            instruction: j.instruction,
            format: j.format,
            op: j.op,
            address: 1000
        })).toBe(true);
    })


















    /*****************************************
     * convertFromAssemblyToDecimal() TESTS
     */
    it("convertFromAssemblyToDecimal() converts successfully for Type R's 'add'!", () => {
        const add : any = operations.find(operation => operation.instruction === "add");
        const t0 : any = registers.find(register => register.assembly_name === "$t0");
        const s1 : any = registers.find(register => register.assembly_name === "$s1");
        const s2 : any = registers.find(register => register.assembly_name === "$s2");

        expect(isExpectedDecimalSchema(rTypeAdd.getDecimal(),
            [
                {
                    name: "op",
                    value: add.op
                },
                {
                    name:"rs",
                    value: s1.number
                },

                {
                    name:"rt",
                    value: s2.number
                },
                {
                    name: "rd",
                    value: t0.number
                },
                {
                    name: "shiftAmount",
                    value: add.shiftAmount
                },
                {
                    name: "func",
                    value: add.func
                }
            ]
        )).toBe(true);
    })

    it("convertFromAssemblyToDecimal() converts successfully for Type R's 'mult'!", () => {
        const mult : any = operations.find(operation => operation.instruction === "mult");
        const s3 : any = registers.find(register => register.assembly_name === "$s3");
        const s4 : any = registers.find(register => register.assembly_name === "$s4");

        expect(isExpectedDecimalSchema(rTypeMult.getDecimal(),
            [
                {
                    name: "op",
                    value: mult.op
                },
                {
                    name:"rs",
                    value: s3.number
                },

                {
                    name:"rt",
                    value: s4.number
                },
                {
                    name: "rd",
                    value: mult.rd
                },
                {
                    name: "shiftAmount",
                    value: mult.shiftAmount
                },
                {
                    name: "func",
                    value: mult.func
                }
            ]
        )).toBe(true);
    })

    it("convertFromAssemblyToDecimal() converts successfully for Type R's 'mfhi'!", () => {
        const mfhi : any = operations.find(operation => operation.instruction === "mfhi");
        const s1 : any = registers.find(register => register.assembly_name === "$s1");
        
        expect(isExpectedDecimalSchema(rTypeMfhi.getDecimal(),
            [
                {
                    name: "op",
                    value: mfhi.op
                },
                {
                    name:"rs",
                    value: mfhi.rs
                },
                {
                    name:"rt",
                    value: mfhi.rt
                },
                {
                    name: "rd",
                    value: s1.number
                },
                {
                    name: "shiftAmount",
                    value: mfhi.shiftAmount
                },
                {
                    name: "func",
                    value: mfhi.func
                }
            ]
        )).toBe(true);


    })

    it("convertFromAssemblyToDecimal() converts successfully for Type R's 'jr'", () => {
        const jr : any = operations.find(operation => operation.instruction === "jr");
        const ra : any = registers.find(register => register.assembly_name === "$ra");

        expect(isExpectedDecimalSchema(rTypeJr.getDecimal(), 
            [
                {
                    name: "op",
                    value: jr.op
                },
                {
                    name:"rs",
                    value: ra.number
                },
                {
                    name:"rt",
                    value: jr.rt
                },
                {
                    name: "rd",
                    value: jr.rd
                },
                {
                    name: "shiftAmount",
                    value: jr.shiftAmount
                },
                {
                    name: "func",
                    value: jr.func
                }
            ]
        )).toBe(true);
    })

    it("convertFromAssemblyToDecimal() converts successfully for Type I's 'addi'", () => {
        const addi : any = operations.find(operation => operation.instruction === "addi");
        const s5 : any = registers.find(register => register.assembly_name === "$s5");
        const s6 : any = registers.find(register => register.assembly_name === "$s6"); 

        expect(isExpectedDecimalSchema(iTypeAddi.getDecimal(), [
            {
                name: "op",
                value: addi.op
            },
            {
                name: "rs",
                value: s6.number
            },
            {
                name: "rt",
                value: s5.number
            },
            {
                name: "immediate",
                value: 50
            }
        ])).toBe(true);
    })

    it("convertFromAssemblyToDecimal() converts successfully for Type I's 'lw'", () => {
        const lw : any = operations.find(operation => operation.instruction === "lw");
        const s3 : any = registers.find(register => register.assembly_name === "$s3");
        const t0 : any = registers.find(register => register.assembly_name === "$t0");
        
        expect(isExpectedDecimalSchema(iTypeLw.getDecimal(),
        [
            {
                name: "op",
                value: lw.op
            },
            {
                name: "rs",
                value: s3.number
            },
            {
                name: "rt",
                value: t0.number
            },
            {
                name: "immediate",
                value: 32
            }
        ])).toBe(true);
    })

    it("convertFromAssemblyToDecimal() converts successfully for Type I's 'sw'", () => {
        const sw : any = operations.find(operation => operation.instruction === "sw");
        const s3 : any = registers.find(register => register.assembly_name === "$s3");
        const t0 : any = registers.find(register => register.assembly_name === "$t0");       

       expect(isExpectedDecimalSchema(iTypeSw.getDecimal(),
        [
            {
                name: "op",
                value: sw.op
            },
            {
                name: "rs",
                value: s3.number
            },
            {
                name: "rt",
                value: t0.number
            },
            {
                name: "immediate",
                value: 32
            }
        ])).toBe(true);
    })

    it("convertFromAssemblyToDecimal() converts successfully for Type J's 'j' with hexadecimal address", () => {
        const j = operations.find(operation => operation.instruction === "j")!;
        expect(isExpectedDecimalSchema(jTypeJHex.getDecimal(),
        [
            {
                name: "op",
                value: j.op
            },
            {
                name: "address",
                value: 49604
            }
        ])).toBe(true);
    })

    it("convertFromAssemblyToDecimal() converts successfully for Type J's 'j' with decimal address", () => {
        const j = operations.find(operation => operation.instruction === "j")!;
        expect(isExpectedDecimalSchema(jTypeJDec.getDecimal(),
        [
            {
                name: "op",
                value: j.op
            },
            {
                name: "address",
                value: 1000
            }
        ])).toBe(true);
    })














    




    /*****************************************
     * convertFromDecimalToBinary() TESTS
     */
    it("convertFromDecimalToBinary() converts successfully for Type R's 'add'!", () => {
        expect(isExpectedBinarySchema(rTypeAdd.getBinary(),
            [
                {
                    name: "op",
                    value: "000000",
                    bits: 6
                },
                {
                    name:"rs",
                    value: "10001",
                    bits: 5
                },
                {
                    name:"rt",
                    value: "10010",
                    bits: 5
                },
                {
                    name: "rd",
                    value: "01000",
                    bits: 5
                },
                {
                    name: "shiftAmount",
                    value: "00000",
                    bits: 5
                },
                {
                    name: "func",
                    value: "100000",
                    bits: 6
                }
            ]
        )).toBe(true);
    })

    it("convertFromDecimalToBinary() converts successfully for Type R's 'mult'!", () => {
        expect(isExpectedBinarySchema(rTypeMult.getBinary(),
            [
               {
                    name: "op",
                    value: "000000",
                    bits: 6
                },
                {
                    name:"rs",
                    value: "10011",
                    bits: 5
                },
                {
                    name:"rt",
                    value: "10100",
                    bits: 5
                },
                {
                    name: "rd",
                    value: "00000",
                    bits: 5
                },
                {
                    name: "shiftAmount",
                    value: "00000",
                    bits: 5
                },
                {
                    name: "func",
                    value: "010010",
                    bits: 6
                }
            ]
        )).toBe(true);
    })

    it("convertFromDecimalToBinary converts successfully for Type R's 'mfhi'!", () => {       
        expect(isExpectedBinarySchema(rTypeMfhi.getBinary(),
            [
               {
                    name: "op",
                    value: "000000",
                    bits: 6
                },
                {
                    name:"rs",
                    value: "00000",
                    bits: 5
                },
                {
                    name:"rt",
                    value: "00000",
                    bits: 5
                },
                {
                    name: "rd",
                    value: "10001",
                    bits: 5
                },
                {
                    name: "shiftAmount",
                    value: "00000",
                    bits: 5
                },
                {
                    name: "func",
                    value: "001010",
                    bits: 6
                }
            ]
        )).toBe(true);
    })

    it("convertFromDecimalToBinary() converts successfully for Type R's 'jr'", () => {
        expect(isExpectedBinarySchema(rTypeJr.getBinary(), 
            [
               {
                    name: "op",
                    value: "000000",
                    bits: 6
                },
                {
                    name:"rs",
                    value: "11111",
                    bits: 5
                },
                {
                    name:"rt",
                    value: "00000",
                    bits: 5
                },
                {
                    name: "rd",
                    value: "00000",
                    bits: 5
                },
                {
                    name: "shiftAmount",
                    value: "00000",
                    bits: 5
                },
                {
                    name: "func",
                    value: "001000",
                    bits: 6
                }
            ]
        )).toBe(true);
    })

    it("convertFromDecimalToBinary() converts successfully for Type I's 'addi'", () => {
        expect(isExpectedBinarySchema(iTypeAddi.getBinary(), [
            {
                name: "op",
                value: "001000",
                bits: 6
            },
            {
                name: "rs",
                value: "10110",
                bits: 5
            },
            {
                name: "rt",
                value: "10101",
                bits: 5
            },
            {
                name: "immediate",
                value: "0000000000110010",
                bits: 16
            }
        ])).toBe(true);
    })

    it("convertFromDecimalToBinary converts successfully for Type I's 'lw'", () => {
        expect(isExpectedBinarySchema(iTypeLw.getBinary(),
        [
           {
                name: "op",
                value: "100011",
                bits: 6
            },
            {
                name: "rs",
                value: "10011",
                bits: 5
            },
            {
                name: "rt",
                value: "01000",
                bits: 5
            },
            {
                name: "immediate",
                value: "0000000000100000",
                bits: 16
            }
        ])).toBe(true);
    })

    it("convertFromDecimalToBinary() converts successfully for Type I's 'sw'", () => {
       expect(isExpectedBinarySchema(iTypeSw.getBinary(),
        [
           {
                name: "op",
                value: "101011",
                bits: 6
            },
            {
                name: "rs",
                value: "10011",
                bits: 5
            },
            {
                name: "rt",
                value: "01000",
                bits: 5
            },
            {
                name: "immediate",
                value: "0000000000100000",
                bits: 16
            }
        ])).toBe(true);
    })

    it("convertFromDecimalToBinary() converts successfully for Type J's 'j' with hexadecimal address", () => {
        expect(isExpectedBinarySchema(jTypeJHex.getBinary(),
        [
            {
                name: "op",
                value: "000010",
                bits: 6
            },
            {
                name: "address",
                value: "00000000001100000111000100",
                bits: 26
            }
        ])).toBe(true);
    })

    it("convertFromDecimalToBinary() converts successfully for Type J's 'j' with decimal address", () => {
        expect(isExpectedBinarySchema(jTypeJDec.getBinary(),
        [
            {
                name: "op",
                value: "000010",
                bits: 6
            },
            {
                name: "address",
                value: "00000000000000001111101000",
                bits: 26
            }
        ])).toBe(true);
    })
})


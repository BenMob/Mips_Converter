import Itype from "../../src/models/Itype";
import { isItype } from "../helpers";

describe("Itype class", () => {
    it("Itype constructor initializes attributes correctly with 'addi'", () =>{
        const instruction = "addi";
        const rt = "$s5";
        const rs = "$s6";
        const immediate = 100;
        const actual = new Itype(instruction, rt, rs, immediate);

        expect(isItype(actual, {
            instruction : "addi",
            format: "I",
            op: 8,
            rs: 22,
            rt: 21,
            immediate: 100
        }))
    })

    it("Itype constructor initializes attributes correctly with 'sw'", () =>{
        const instruction = "sw";
        const rt = "$s5";
        const rs = "$s6";
        const immediate = 100;
        const actual = new Itype(instruction, rt, rs, immediate);

        expect(isItype(actual, {
            instruction : "addi",
            format: "I",
            op: 43,
            rs: 22,
            rt: 21,
            immediate: 100
        }))
    })

    it("Itype constructor initializes attributes correctly with 'lw'", () =>{
        const instruction = "lw";
        const rt = "$s5";
        const rs = "$s6";
        const immediate = 100;
        const actual = new Itype(instruction, rt, rs, immediate);

        expect(isItype(actual, {
            instruction : "lw",
            format: "I",
            op: 35,
            rs: 22,
            rt: 21,
            immediate: 100
        }))
    })

    it("Itype constructor initializes attributes correctly with 'beq'", () =>{
        const instruction = "beq";
        const rt = "$s5";
        const rs = "$s6";
        const immediate = 100;
        const actual = new Itype(instruction, rt, rs, immediate);

        expect(isItype(actual, {
            instruction : "beq",
            format: "I",
            op: 4,
            rs: 22,
            rt: 21,
            immediate: 100
        }))
    })

    it("Itype constructor initializes attributes correctly with 'bne'", () =>{
        const instruction = "bne";
        const rt = "$s5";
        const rs = "$s6";
        const immediate = 100;
        const actual = new Itype(instruction, rt, rs, immediate);

        expect(isItype(actual, {
            instruction : "bne",
            format: "I",
            op: 5,
            rs: 22,
            rt: 21,
            immediate: 100
        }))
    })
})
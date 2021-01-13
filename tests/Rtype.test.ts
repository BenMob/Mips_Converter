import Rtype from "../src/models/Rtype";
import { isRtype } from "./helpers";

describe("Rtype Class", () => {
    it("Rtype constructor initializes attributes correctly on 'add'", () => {
        const instruction = "add";
        const rs = "$s1";
        const rt = "$s2";
        const rd = "$t0";
        const actual = new Rtype(instruction, rd, rs, rt);

        expect(isRtype(actual, {
            instruction : "add",
            format: "R",
            op: 0,
            rs: 17,
            rt: 18,
            rd: 8,
            shiftAmount: 0,
            func: 32
        })).toBe(true);
 
        expect(actual.length).toBe(5);
        expect(actual.bits.length).toBe(6);
        expect(actual.bits[0]).toBe(6);
        expect(actual.bits[1]).toBe(5);
        expect(actual.bits[2]).toBe(5);
        expect(actual.bits[3]).toBe(5);
        expect(actual.bits[4]).toBe(5);
        expect(actual.bits[5]).toBe(6);
    })

    it("Rtype constructor initializes attributes correctly on 'sub'", () => {
        const instruction = "sub";
        const rs = "$s1";
        const rt = "$s2";
        const rd = "$t0";
        const actual = new Rtype(instruction, rd, rs, rt);

        expect(isRtype(actual, {
            instruction : "sub",
            format: "R",
            op: 0,
            rs: 17,
            rt: 18,
            rd: 8,
            shiftAmount: 0,
            func: 34
        })).toBe(true);
 
        expect(actual.length).toBe(5);
        expect(actual.bits.length).toBe(6);
        expect(actual.bits[0]).toBe(6);
        expect(actual.bits[1]).toBe(5);
        expect(actual.bits[2]).toBe(5);
        expect(actual.bits[3]).toBe(5);
        expect(actual.bits[4]).toBe(5);
        expect(actual.bits[5]).toBe(6);
    })

    it("Rtype constructor initializes attributes correctly on 'mult'", () => {
        const instruction = "mult";
        const rs = "$s3";
        const rt = "$s4";
        const actual = new Rtype(instruction, rs, rt);

        expect(isRtype(actual, {
            instruction : "mult",
            format: "R",
            op: 0,
            rs: 19,
            rt: 20,
            rd: 0,
            shiftAmount: 0,
            func: 18
        })).toBe(true);
 
        expect(actual.length).toBe(5);
        expect(actual.bits.length).toBe(6);
        expect(actual.bits[0]).toBe(6);
        expect(actual.bits[1]).toBe(5);
        expect(actual.bits[2]).toBe(5);
        expect(actual.bits[3]).toBe(5);
        expect(actual.bits[4]).toBe(5);
        expect(actual.bits[5]).toBe(6);
    })

    it("Rtype constructor initializes attributes correctly on 'div'", () => {
        const instruction = "div";
        const rs = "$s3";
        const rt = "$s4";
        const actual = new Rtype(instruction, rs, rt);

        expect(isRtype(actual, {
            instruction : "div",
            format: "R",
            op: 0,
            rs: 19,
            rt: 20,
            rd: 0,
            shiftAmount: 0,
            func: 26
        })).toBe(true);

        expect(actual.length).toBe(5);
        expect(actual.bits.length).toBe(6);
        expect(actual.bits[0]).toBe(6);
        expect(actual.bits[1]).toBe(5);
        expect(actual.bits[2]).toBe(5);
        expect(actual.bits[3]).toBe(5);
        expect(actual.bits[4]).toBe(5);
        expect(actual.bits[5]).toBe(6);
    })

    it("Rtype constructor initializes attributes correctly on 'mlhi'", () => {
        const instruction = "mfhi";
        const rd = "$s1";
        const actual = new Rtype(instruction, rd);

        expect(isRtype(actual, {
            instruction : "mfhi",
            format: "R",
            op: 0,
            rs: 0,
            rt: 0,
            rd: 17,
            shiftAmount: 0,
            func: 10
        })).toBe(true);

        expect(actual.length).toBe(5);
        expect(actual.bits.length).toBe(6);
        expect(actual.bits[0]).toBe(6);
        expect(actual.bits[1]).toBe(5);
        expect(actual.bits[2]).toBe(5);
        expect(actual.bits[3]).toBe(5);
        expect(actual.bits[4]).toBe(5);
        expect(actual.bits[5]).toBe(6);       
    })

    it("Rtype constructor initializes attributes correctly on 'mflo'", () => {
        const instruction = "mflo";
        const rd = "$s1";
        const actual = new Rtype(instruction, rd);

        expect(isRtype(actual, {
            instruction : "mflo",
            format: "R",
            op: 0,
            rs: 0,
            rt: 0,
            rd: 17,
            shiftAmount: 0,
            func: 12
        })).toBe(true);

        expect(actual.length).toBe(5);
        expect(actual.bits.length).toBe(6);
        expect(actual.bits[0]).toBe(6);
        expect(actual.bits[1]).toBe(5);
        expect(actual.bits[2]).toBe(5);
        expect(actual.bits[3]).toBe(5);
        expect(actual.bits[4]).toBe(5);
        expect(actual.bits[5]).toBe(6);              
    })

    it("Rtype constructor initializes attributes correctly on 'slt'", () => {
        const instruction = "slt";
        const rs = "$s1";
        const rt = "$s2";
        const rd = "$t0";
        const actual = new Rtype(instruction, rd, rs, rt);

        expect(isRtype(actual, {
            instruction : "slt",
            format: "R",
            op: 0,
            rs: 17,
            rt: 18,
            rd: 8,
            shiftAmount: 0,
            func: 42
        })).toBe(true);
 
        expect(actual.length).toBe(5);
        expect(actual.bits.length).toBe(6);
        expect(actual.bits[0]).toBe(6);
        expect(actual.bits[1]).toBe(5);
        expect(actual.bits[2]).toBe(5);
        expect(actual.bits[3]).toBe(5);
        expect(actual.bits[4]).toBe(5);
        expect(actual.bits[5]).toBe(6);      
    })

    it("Rtype constructor initializes attributes correctly on 'jr'", () => {
        const instruction = "jr";
        const rs = "$ra";
        const actual = new Rtype(instruction, rs);

        expect(isRtype(actual, {
            instruction : "jr",
            format: "R",
            op: 0,
            rs: 31,
            rt: 0,
            rd: 0,
            shiftAmount: 0,
            func: 8
        })).toBe(true);
 
        expect(actual.length).toBe(5);
        expect(actual.bits.length).toBe(6);
        expect(actual.bits[0]).toBe(6);
        expect(actual.bits[1]).toBe(5);
        expect(actual.bits[2]).toBe(5);
        expect(actual.bits[3]).toBe(5);
        expect(actual.bits[4]).toBe(5);
        expect(actual.bits[5]).toBe(6);         
    })
})
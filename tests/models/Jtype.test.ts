import Jtype from "../../src/models/Jtype";
import { isJtype } from "../helpers";

describe("Jtype Class", () =>{
    it("Jtype constructor initializes attributes correctly with 'j'", () => {
        const instruction = "j";
        const address = "0xc1c4";
        const actual = new Jtype(instruction, address);

        expect(isJtype(actual, {
            instruction: "j",
            format: "J",
            op: 2,
            address: "0xc1c4"
        })).toBe(true)

        expect(actual.length).toBe(2);
        expect(actual.bits[0]).toBe(6);
        expect(actual.bits[1]).toBe(26)
        expect(actual.bits.length).toBe(2);
    })

    it("Jtype constructor initializes attributes correctly with 'jal'", () => {
        const instruction = "jal";
        const address = 50;
        const actual = new Jtype(instruction, address);

        expect(isJtype(actual, {
            instruction: "jal",
            format: "J",
            op: 3,
            address: 50
        })).toBe(true)

        expect(actual.length).toBe(2);
        expect(actual.bits[0]).toBe(6);
        expect(actual.bits[1]).toBe(26)
        expect(actual.bits.length).toBe(2);
    })
})
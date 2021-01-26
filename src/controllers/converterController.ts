import Instruction from "../models/Instruction";
import registers from "../data/registers.json";
import operations from "../data/operations.json";
import express from "express";

/**
 * Processes instruction POST requests
 * @param req
 * @param res
 */
export const mipsToMachine = (req: express.Request, res: express.Response) => {
    const instruction = new Instruction(req.body.instruction);

    instruction.init().then(() => {
        const errorMessage = instruction.getErrorMessage();
        if(errorMessage){
            res.json({error: true, errorMessage });
        }else{
            res.json({
                type : instruction.getType(),
                assembly: instruction.getAssembly(),
                decimal: instruction.getDecimal(),
                binary: instruction.getBinary(),
                error: false
            });
        }
    })
}

/**
 * Processes GET requests for supported operations
 * @param req
 * @param res
 */
export const getOperations = (req: express.Request, res: express.Response) => {
    res.json({
        type: "operations",
        operations
    });
}

/**
 * Processes GET requests for supported registers
 * @param req
 * @param res
 */
export const getRegisters = (req: express.Request, res: express.Response) => {


    res.json({
        type: "registers",
        registers
    });
}
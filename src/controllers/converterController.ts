import Instruction from "../models/Instruction"
import express from "express";
import operations from "../data/operations.json";

export const mipsToMachine = (req: express.Request, res: express.Response) => {

    const instruction = new Instruction(req.body.instruction);
    const error = instruction.getErrorMessage();

    if(error){
        res.json(error);
    }else{
        res.json(instruction);
    }
}


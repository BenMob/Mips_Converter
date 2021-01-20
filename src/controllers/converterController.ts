import Instruction from "../models/Instruction"
import express from "express";


export const mipsToMachine = (req: express.Request, res: express.Response) => {
    const instruction = new Instruction(req.body.instruction);

    instruction.init().then(() => {
        const error = instruction.getErrorMessage();
        if(error){
            res.json({error: error});
        }else{
            res.json({
                type : instruction.getType(),
                assembly: instruction.getAssembly(),
                decimal: instruction.getDecimal(),
                binary: instruction.getBinary()
            });
        }
    })
}


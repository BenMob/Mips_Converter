import Instruction from "../models/Instruction"
import express from "express";


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


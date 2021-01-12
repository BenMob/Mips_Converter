import Instruction from "../models/Instruction"
import express from "express";
import operations from "../data/operations.json";

export const mipsToMachine = (req: express.Request, res: express.Response) => {
    res.json([{
        state : "Still implementing the app, but here is some data for you to play with",

    }, ...operations]);
}


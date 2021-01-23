/**
 * Home Routes
 */
 import express from "express";
 import { mipsToMachine, getOperations, getRegisters } from "../controllers/converterController";

 const router: express.Router = express.Router();
 router.get('/', (req, res) => {
     res.render('index');
 })

 router.post('/convert', mipsToMachine);
 router.get('/registers', getRegisters);
 router.get('/operations', getOperations);

 export default router;

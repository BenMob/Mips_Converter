/**
 * Home Routes
 */
 import express from "express";
 import { mipsToMachine } from "../controllers/converterController";

 const router: express.Router = express.Router();
 router.get('/', (req, res) => {
     res.render('index');
 })
 
 router.post('/convert', mipsToMachine);

 export default router;

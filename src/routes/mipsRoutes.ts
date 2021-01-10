/**
 * Mips Routes
 */
 import express from "express";

 const router: express.Router = express.Router();
 router.get('/', (req, res) => {
     res.render('mips');
 })

 export default router;
/**
 * Registers Routes
 */
 import express from "express";

 const router: express.Router = express.Router();
 router.get('/', (req, res) => {
     res.render('registers');
 })

 export default router;
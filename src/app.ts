import express from "express";

const app = express();
const port = 8080;

app.get("/", (req : express.Request, res: express.Response) => {
   res.send("Express App Set up with Typescript");
})

app.listen(port, () => {
   console.log(`Server started on http://localhost:8080`)
});
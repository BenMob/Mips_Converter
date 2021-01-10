/**
 * Creating the app server
 */
import express from "express";
import morgan from "morgan";
import converterRoutes from "./routes/converterRoutes";
import codetableRoutes from "./routes/codetableRoutes";
import mipsRoutes from "./routes/mipsRoutes";
import registersRoutes from "./routes/registersRoutes";
const app = express();

class Server {
    constructor(){
        this.initMiddleWares();
        this.initRoutes()
    }

    // Initializes port and middleware.
    initMiddleWares(): void{
        const port: number | string = process.env.PORT || 8080;                             // Declare the port.
        app.listen(port, () => console.log(`Server running on http://localhost:${8080}`));  // Listen to the port.
        app.set("view engine", "ejs");                                                      // Set the template engine.
        app.set("views", "./src/views");                                                    // Set the location of templates.
        app.use(express.static("public"));                                                  // Set location of the public assets.
        app.use(express.urlencoded({extended: true}));                                      // Use URL encoder on incoming requests.
        app.use(morgan("dev"));                                                             // Use 'dev' logger.
    }

    // Initializez routes.
    initRoutes(): void{
        app.use("/", converterRoutes);
        app.use("/mips", mipsRoutes);
        app.use("/registers", registersRoutes);
        app.use("/codetable", codetableRoutes);
    }
}

export default Server;
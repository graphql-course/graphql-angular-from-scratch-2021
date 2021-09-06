import compression from "compression";
import express from "express";
import { createServer } from "http";
const app = express();

app.use(compression());

app.use("/", (_, res) => {
    res.send("Bienvenid@s al primer proyecto");
});

const httpServer = createServer(app);

httpServer.listen({
    port: 3025
},
() => console.log("Servidor => http://localhost:3025"));
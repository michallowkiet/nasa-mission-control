import express from "express";
import cors from "cors";
import planetRouter from "./routes/planets/planets.router.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

app.use(planetRouter);

export default app;

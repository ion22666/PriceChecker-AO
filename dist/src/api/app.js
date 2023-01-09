import express from "express";
import middlewares from "./middlewares/middlewares";
import appRouter from "./routes/appRouter";
import apiRouter from "./routes/apiRouter";
const app = express();
// Define Front Middleware Functions
middlewares.start.forEach(middleware => app.use(...middleware));
// Define routes
app.use("/", appRouter);
app.use("/api", apiRouter);
// Define Back middleware functions
middlewares.end.forEach(middleware => app.use(...middleware));
export default app;

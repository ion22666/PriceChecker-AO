import express from "express";
import appIndex from "../controllers/app-index";
const appRouter = express.Router();
appRouter.route("/").get(appIndex.get).all(appIndex.all);
export default appRouter;

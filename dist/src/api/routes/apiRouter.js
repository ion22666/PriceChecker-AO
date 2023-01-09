import express from "express";
import apiIndex from "../controllers/api-index";
import apiItems from "../controllers/api-items";
const apiRouter = express.Router();
apiRouter.route("/").get(apiIndex.get).all(apiIndex.all);
apiRouter.route("/items").get(apiItems.getIndex).all(apiItems.all);
apiRouter.route("/items/:unique_name").get(apiItems.get).all(apiItems.all);
export default apiRouter;

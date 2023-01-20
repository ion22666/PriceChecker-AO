import express, { Handler } from "express";
import apiIndex from "../controllers/api-index";
import * as apiItems from "../controllers/api-items";
import { validators } from "../controllers/api-validators";

const apiRouter = express.Router();

apiRouter.route("/*").all(validators);
apiRouter.route("/").get(apiIndex.get);
apiRouter.route("/item/:name").get(apiItems.get_one);
apiRouter.route("/items").get(apiItems.param_validator, apiItems.get_many);

export default apiRouter;

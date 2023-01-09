import express, { Handler } from "express";
import apiIndex from "../controllers/api-index";
import apiItems from "../controllers/api-items";
import apiValidators from "../controllers/api-validators";

const apiRouter = express.Router();

// Language and Method Validator
apiRouter.route("/*").all(apiValidators.method_validator).get(apiValidators.lang_validator);
apiRouter.route("/").get(apiIndex.get);
apiRouter.route("/items").get(apiItems.getIndex);
apiRouter.route("/items/:count([0-9]+)-:page([0-9]+)/:category?/:sub_category?").get(apiItems.get_many);
apiRouter.route("/items/:name").get(apiItems.get_one);

export default apiRouter;

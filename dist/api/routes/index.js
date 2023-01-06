export { app } from "../index";
import * as handlers from "../controllers/handlers";
export default [
    {
        url: "/",
        method: "all",
        handler: handlers.app,
    },
];

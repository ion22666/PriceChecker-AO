import * as handlers from "./url-handlers";
export default function map(app) {
    app.all("/", handlers.app);
}

import { MongoClient } from "mongodb"; // Import various types and interfaces from the MongoDB driver
import http from "http"; // for creating an HTTP server
// Returns URL of image for an item
const get_img_url = (item) => `https://render.albiononline.com/v1/item/${item.UniqueName}.png`;
// Connects to MongoDB and creates HTTP server
async function main() {
    const client = await MongoClient.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.wgurxzm.mongodb.net/?retryWrites=true&w=majority`);
    const db = client.db("AO_Price_Checker");
    const items_collection = db.collection("items");
    const server = http
        .createServer((req, res) => {
        let url = req.url;
        console.log(url);
        if (url === undefined || url === "") {
            res.writeHead(404, "Not Found", {
                "Content-Type": "text/html",
            });
            res.end("<h1>404 Not Found</h1>");
        }
        else {
            url = url.replace(/^\//, "");
        }
        items_collection
            .findOne({
            $or: [{ UniqueName: url }],
        })
            .then(item => {
            res.writeHead(200, "OK", {
                "Content-Type": "text/html",
            });
            if (item !== null) {
                res.end(`<a href="${get_img_url(item)}">${get_img_url(item)}</a>`);
            }
            else {
                res.writeHead(404, "Not Found", {
                    "Content-Type": "text/html",
                });
                res.end("<h1>404 Not Found</h1>");
            }
        });
    })
        .listen(8000, process.env.DEV_STATE ? undefined : "0.0.0.0", () => {
        let address = server.address();
        address = address === null ? "unknow" : address;
        console.log(`Server is running on http://${typeof address == "string" ? address : (address.address === "::" ? "localhost" : address.address) + ":" + address.port.toString()}`);
    });
}
main();

import { MongoClient } from "mongodb";
class DB {
    static _collections;
    static async connect() {
        let client = await MongoClient.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.wgurxzm.mongodb.net/?retryWrites=true&w=majority`);
        DB._collections = {
            itemsArray: client.db("ao-items").collection("items-array"),
            itemsTree: client.db("ao-items").collection("items-tree"),
        };
    }
    static get collections() {
        return DB._collections;
    }
}
export default DB;

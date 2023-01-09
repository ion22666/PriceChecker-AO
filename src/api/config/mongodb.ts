import { Collection, MongoClient } from "mongodb";

type collections = {
    itemsArray: Collection<Document>;
    itemsTree: Collection<Document>;
};

class DB {
    private static _collections: collections;
    static async connect() {
        let client = await MongoClient.connect(
            `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.wgurxzm.mongodb.net/?retryWrites=true&w=majority`
        );
        DB._collections = {
            itemsArray: client.db("ao-items").collection("items"),
            itemsTree: client.db("ao-items").collection("items1")
        };
    }
    static get collections() {
        return DB._collections;
    }
}
export default DB;

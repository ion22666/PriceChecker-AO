import { MongoClient } from "mongodb"; // Import various types and interfaces from the MongoDB driver
const items = (async () => {
    const client = await MongoClient.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.wgurxzm.mongodb.net/?retryWrites=true&w=majority`);
    return client.db("AO_Price_Checker").collection("items");
})();
export default {
    items: items,
};

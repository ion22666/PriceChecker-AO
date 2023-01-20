var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MongoClient } from "mongodb";
class DB {
    static connect() {
        return __awaiter(this, void 0, void 0, function* () {
            let client = yield MongoClient.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.wgurxzm.mongodb.net/?retryWrites=true&w=majority`);
            DB._collections = {
                itemsArray: client.db("ao-items").collection("items-array"),
                itemsTree: client.db("ao-items").collection("items-tree"),
            };
        });
    }
    static get collections() {
        return DB._collections;
    }
}
export default DB;

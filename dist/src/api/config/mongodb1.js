class DB {
    static _n = 0;
    static async connect() { }
    static get n() {
        return DB._n++;
    }
}
export default DB;

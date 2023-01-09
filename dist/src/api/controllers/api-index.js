import Return405 from "../middlewares/Return405";
//--------------/api
export default {
    get: (req, res) => {
        res.status(200).json({ message: "Api Page" });
    },
    all: Return405,
};

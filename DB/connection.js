import mongoose from "mongoose";

const connect = async () => {
    await mongoose.connect(process.env.DBURI)
        .then(() => {
            console.log("Database connected");
        }).catch((error) => {
            console.log("Database connection error", error);
        })
}
export default connect;
import mongoose from "mongoose";

const connect = async () => {
    await mongoose.connect(process.env.DB_connection)
        .then(() => {
            console.log("Database connected");
        }).catch((error) => {
            console.log("Database connection error", error);
        })
}
export default connect;
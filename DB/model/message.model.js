import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema(
    {
        content: String,

    },
    { timestamps: true }
);

const messagesModel = mongoose.model("messages", messagesSchema);
export default messagesModel;
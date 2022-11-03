import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema(
    {
        content: String,
        createdBy:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            default: [],
        }

    },
    { timestamps: true }
);

const messagesModel = mongoose.model("messages", messagesSchema);
export default messagesModel;
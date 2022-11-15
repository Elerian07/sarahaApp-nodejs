import messagesModel from "../../../DB/model/message.model.js";
import trashCanModel from "../../../DB/model/trashCan.model.js";
import userModel from "../../../DB/model/user.model.js";
export const getMessages = async (req, res) => {
    try {
        const getMessages = await messagesModel.find()
        res.json({ message: "Done", getMessages })
    } catch (error) {
        res.json({ message: "error", error })
    }
}

export const addMessage = async (req, res) => {
    try {
        const { content } = req.body;
        const { userId } = req.params;
        const addMessage = new messagesModel({ content });
        const addedMessage = await addMessage.save();
        const recivedUser = await userModel.findByIdAndUpdate(userId, { $push: { messages: addedMessage._id } })
        res.json({ message: "added", addMessage })
    } catch (error) {
        res.json({ message: "error", error })
    }
}

export const deleteMessage = async (req, res) => {
    try {
        let { id } = req.params;
        const message = await messagesModel.findById({ _id: id });
        if (!message) {
            res.json({ message: "message not found" })
        } else {
            const deleteMessage = await messagesModel.findByIdAndDelete({ _id: id })
            res.json({ message: "deleted" })
        }
    } catch (error) {
        res.json({ message: "error", error })
    }
}
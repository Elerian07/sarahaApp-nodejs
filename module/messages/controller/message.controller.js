import messagesModel from "../../../DB/model/message.model.js";
import trashCanModel from "../../../DB/model/trashCan.model.js";
export const getMessages = async (req, res) => {
    try {
        const getNotes = await messagesModel.find({})
        res.json({ message: "Done", getMessages })
    } catch (error) {
        res.json({ message: "error", error })
    }
}
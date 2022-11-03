import userModel from "../../../DB/model/user.model.js"
import messagesModel from "../../../DB/model/message.model.js"
import trashCanModel from "../../../DB/model/trashCan.model.js";
import bcrypt from "bcryptjs";


export const changePassword = async (req, res) => {

    try {
        let { currentPassword, newPassword, newCPassword } = req.body;
        if (newPassword == newCPassword) {
            let user = await userModel.findById(req.userId);
            const matched = await bcrypt.compare(currentPassword, user.password);
            if (matched) {
                const hash = await bcrypt.hashSync(newPassword, parseInt(process.env.saltRound));
                let updatedUser = await userModel.findByIdAndUpdate(user._id, { password: hash }, { new: true })
                res.json({ message: "Updated", updatedUser })
            } else {
                res.json({ message: "current password invalid" })
            }

        } else {
            res.json({ message: "new Password and new cPassword didn't match" })
        }
    } catch (error) {
        res.json({ message: "error", error })
    }
}


export const deleteById = async (req, res) => {

}


export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const getUser = await userModel.findById({ _id: id })
        const getNots = await messagesModel.findOne({ createdBy: id })
        res.json({ message: "done", getUser, getNots })
    } catch (error) {
        res.json({ message: "id not found", error })

    }
}

export const softDelete = async (req, res) => { }
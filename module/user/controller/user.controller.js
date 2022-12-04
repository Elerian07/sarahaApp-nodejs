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
                res.status(200).json({ message: "Updated", updatedUser })
            } else {
                res.json({ message: "current password invalid" })
            }

        } else {
            res.status(400).json({ message: "new Password and new cPassword didn't match" })
        }
    } catch (error) {
        res.status(500).json({ message: "error", error })
    }
}


export const deleteById = async (req, res) => {
    try {
        let user = await userModel.findById({ _id: req.userId })
        if (!user) {
            res.status(401).json({ message: "you are not authorized" })
        } else {
            let deletedUser = await userModel.findByIdAndDelete({ _id: req.userId })
            res.status(200).json({ message: "User id deleted", deletedUser })
        }
    } catch (error) {
        res.status(500).json({ message: "Error", error })
    }

}
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const getUser = await userModel.findById({ _id: id })
        const getNots = await messagesModel.findOne({ createdBy: id })
        res.status(200).json({ message: "done", getUser, getNots })
    } catch (error) {
        res.status(500).json({ message: "Error", error })
    }
}

export const softDelete = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId);

        if (user) {
            const user = await userModel.findByIdAndUpdate(
                req.userId,
                { isDeleted: true },
                { new: true }
            );
            const trashUser = await trashCanModel.insertMany(user);
            let messages = await messagesModel.find({ _id: user.message })
            const trashMessages = await messagesModel.insertMany(messages);
            const deletedUser = await userModel.findByIdAndDelete(req.userId);
            res.status(200).json({ message: "user is deleted", deletedUser });
        } else {
            res.status(404).json({ message: "id not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error", error })
    }
}

export const profilePic = async (req, res) => {
    try {
        let { image } = req.body;
        if (req.file) {
            let uploadImg = await cloudinary.uploader.upload(req.file.path, {
                folder: "profile"
            })

            let profile = await userModel.findByIdAndUpdate(req.userId, { profilePic: uploadImg.secure_url }, { new: true })
            res.status(200).json({ message: "Done", profile })
        } else {
            res.status(404).json({ message: "you need to upload images" })
        }
    } catch (error) {

        res.status(500).json({ message: "Error", error })
    }

}

export const coverPic = async (req, res) => {
    try {
        let { image } = req.body;
        let uploadImg = await cloudinary.uploader.upload(req.file.path, {
            folder: "Cover"
        })
        let cover = await userModel.findByIdAndUpdate(req.userId,
            {
                coverPic: uploadImg.secure_url,
            })

        res.status(200).json({ message: "Done", cover })
    } catch (error) {
        res.status(500).json({ message: "Error", error })
    }
}
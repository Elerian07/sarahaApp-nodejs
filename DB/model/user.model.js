import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: Number,
    phone: String,
    isDeleted: {
        type: Boolean,
        default: false,
    },
    isConfirmed: {
        type: Boolean,
        default: false,
    },
    profilePic: String,
    coverPics: String,
    OTP: String,
    messages: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "messages",
    }


});

const userModel = mongoose.model("user", userSchema);
export default userModel;
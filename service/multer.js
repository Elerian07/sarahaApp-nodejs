import multer from "multer";
import { nanoid } from "nanoid";
import fs from 'fs';
import path from "path";
import { fileURLToPath } from "url";

const _dirname = path.dirname(fileURLToPath(import.meta.url))


export const validationType = {
    Image: ["image/png", "image/jpg", "image/jpeg"]
}

export function HM(error, req, res, next) {
    if (error) {
        res.json({ message: "multer error message", error })
    } else {
        next();
    }
}


export function myMulter(acceptType, customPath) {

    if (!customPath) {
        customPath = "general"
    }
    const fullPath = path.join(_dirname, `../uploads/${customPath}`)
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true })
    }
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads/${customPath}`)
        },
        filename: function (req, file, cb) {

            cb(null, nanoid() + "_" + file.originalname)
        }
    })

    function fileFilter(req, file, cb) {
        if (acceptType.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb("invalid image format", false);
        }
    }
    const upload = multer({ dest: `/uploads/${customPath}`, storage, fileFilter });
    return upload;
}
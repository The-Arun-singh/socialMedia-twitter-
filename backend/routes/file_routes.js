import multer from "multer";
import express from 'express';

const fileRouter = express.Router();

// all the route end points for the file upload and downloads and also their logic to handle the file upload and downloads using multer.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 1
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === "image/jpg") {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
})


fileRouter.post("/uploadfile", upload.single('file'), function (req, res) {
    if (!req.file) {
        return res.status(400).json({ error: "File types allowed are .jpeg, .png, .jpg" });
    }
    try {
        res.status(200).json({ "fileName": req.file.filename });
    } catch (error) {
        console.log(error);
    }
})

const downloadFile = (req, res) => {
    const storedFileName = req.params.filename;
    // const originalFileName = storedFileName.split('-')[1];
    const path = __basedir + "/uploads/";

    res.download(path + storedFileName, (err) => {
        if (err) return res.status(500).json({ error: "file cannot be downloaded " + err });
    })
}

fileRouter.get("/files/:filename", downloadFile)

export default fileRouter;
import { Router } from "express";
import { upload } from "../middlewares/upload.js";
import { getPerticularVideo, getVideos, Search, uploadVideo } from "../controllers/video.controller.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = Router();

const multerUpload = upload.fields([
    {
        name: 'videoFile',  maxCount: 1
    },
    {
        name: 'thumbnail', maxCount: 1
    }
]);

router.route("/upload").post(multerUpload,uploadVideo);

router.route("/").get(getVideos)

router.route("/:id").get(getPerticularVideo)

router.route("/search/searched").get(Search)

export default router;
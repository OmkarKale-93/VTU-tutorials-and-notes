import { Router } from "express";
import { upload } from "../middlewares/upload.js";
import { getpdfs, getPerticularNotes, pdfUpload } from "../controllers/pdf.controller.js";
import { isAuthenticated } from "../middlewares/auth.js";



const router = Router();

const multerUpload = upload.fields([
    {
        name: 'pdfFile',  maxCount: 1
    },
]);

router.route("/upload").post(multerUpload,pdfUpload);
router.route("/").get(getpdfs);
router.route("/:id").get(getPerticularNotes)

export default router;
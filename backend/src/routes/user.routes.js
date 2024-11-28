import { Router } from "express";
import { upload } from "../middlewares/upload.js";
import {  getAboutYourself, getCookies, loginUser, logout, registerUser } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.js";



const router = Router();

const multerUpload = upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 }
]);

router.route("/register").post(multerUpload, registerUser);
router.route("/login").post(loginUser)
router.route("/logout").get(isAuthenticated,logout)
router.route("/getCookie").get(getCookies);
router.route("/getabout").get(getAboutYourself);


export default router;
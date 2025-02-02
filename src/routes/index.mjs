import express from "express";
import apiKeyMiddleware from "../controllers/apiPolice.mjs";
import { login, registerAccount, validateAccount, validateForgotPassword, changePassword } from "../controllers/user.mjs";

const router = express.Router();

router.use(apiKeyMiddleware);

router.get("/", (req, res) => {
    res.status(200).json({ type: "success", message: "This is the root end point of DeraSewa Backend", payload: null });
})
.post("/validate-account", validateAccount)
.post("/register-account", registerAccount)
.post("/login", login)
.post("/validate-forgot-password", validateForgotPassword)
.post("/change-password", changePassword)

export default router;
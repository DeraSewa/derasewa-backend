import express from "express";
import apiKeyMiddleware from "../controllers/apiPolice.mjs";
import { loginUser, registerUserAccount, validateUserAccount } from "../controllers/user.mjs";

const router = express.Router();

router.use(apiKeyMiddleware);

router.get("/", (req, res) => {
    res.status(200).json({ type: "success", message: "This is the root end point of DeraSewa Backend", payload: null });
})
.post("/validate-user-account", validateUserAccount)
.post("/register-user-account", registerUserAccount)
.post("/login-user", loginUser)

export default router;
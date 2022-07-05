import { Router } from "express";
import authRouter from "./authRouter.js";
import urlRouter from "./urlRouter.js";
import userRouter from "./userRouter.js";

const router = new Router();

router.use(authRouter);
router.use("/urls", urlRouter);
router.use(userRouter);

export default router;

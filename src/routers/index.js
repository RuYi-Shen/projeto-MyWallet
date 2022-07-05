import { Router } from "express";
import authRouter from "./authRouter.js";
import financialRouter from "./financialRouter.js";

const router = new Router();

router.use(authRouter);
router.use(financialRouter);

export default router;

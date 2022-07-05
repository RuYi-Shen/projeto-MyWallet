import { Router } from "express";
import { getFinancialEvents, getFinancialEventsSum } from "../controllers/financialController.js";

const financialRouter = Router();

financialRouter.get("/financial-events", getFinancialEvents);
financialRouter.get("/financial-events/sum", getFinancialEventsSum);

export default financialRouter;
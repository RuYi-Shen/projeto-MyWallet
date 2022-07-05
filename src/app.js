import cors from "cors";
import express from "express";
import router from "./routers/index.js";
import financialRouter from "./routers/financialRouter.js";
import handleError from "./middlewares/handleErrorMiddleware.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
app.use(financialRouter);
app.use(handleError);

export default app;

import jwt from "jsonwebtoken";
import { getFinancialEventsService, getFinancialEventsSumService } from "../services/financialService.js";

export async function getFinancialEvents(req, res) {
  const authorization = req.headers.authorization || "";
  const token = authorization.replace("Bearer ", "");

  if (!token) {
    return res.sendStatus(401);
  }

  let user;

  try {
    user = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return res.sendStatus(401);
  }

  const events = getFinancialEventsService(user.id);

  res.send(events.rows);
}

export async function getFinancialEventsSum(req, res) {
  const authorization = req.headers.authorization || "";
  const token = authorization.replace("Bearer ", "");

  if (!token) {
    return res.sendStatus(401);
  }

  let user;

  try {
    user = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return res.sendStatus(401);
  }

  const sum = getFinancialEventsSumService(user.id);

  res.send({ sum });
}

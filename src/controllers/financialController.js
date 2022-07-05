import jwt from "jsonwebtoken";
import { findFinancialEvents, findFinancialEventsSum } from "../repositories/financialRepository.js";

export async function getFinancialEvents(req, res) {
    try {
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
    
        const events = findFinancialEvents(user.id);
    
        res.send(events.rows);
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
}

export async function getFinancialEventsSum(req, res) {
    try {
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
    
        const events = findFinancialEventsSum(user.id);
    
        const sum = events.rows.reduce(
          (total, event) =>
            event.type === "INCOME" ? total + event.value : total - event.value,
          0
        );
    
        res.send({ sum });
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
}

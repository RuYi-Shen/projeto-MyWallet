import { findFinancialEvents, findFinancialEventsSum } from "../repositories/financialRepository.js";

export async function getFinancialEventsService(id) {
    const events = findFinancialEvents(id);
    return events;
}

export async function getFinancialEventsSumService(id){
    const events = findFinancialEventsSum(id);

  const sum = events.rows.reduce(
    (total, event) =>
      event.type === "INCOME" ? total + event.value : total - event.value,
    0
  );
}
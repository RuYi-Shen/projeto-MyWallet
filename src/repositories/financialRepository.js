import connection from "../database.js";

export async function findFinancialEvents(id) {
  return await connection.query(
    `SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
    [id]
  );
}

export async function findFinancialEventsSum(id) {
    return await connection.query(
        `SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
        [id]
      );
}

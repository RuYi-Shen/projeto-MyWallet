import connection from "../database.js";

export async function getUserByEmail(email) {
  return await connection.query(`SELECT * FROM "users" WHERE "email"=$1`, [
    email,
  ]);
}

export async function addUser(name, email, hashedPassword) {
  await connection.query(
    `INSERT INTO "users" ("name", "email", "password") VALUES ($1, $2, $3)`,
    [name, email, hashedPassword]
  );
}

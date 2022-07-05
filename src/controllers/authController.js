import bcrypt from "bcrypt";
import { getUserByEmail } from "../repositories/authRepository.js";
import { signUpService, signInService } from "../services/authService.js";

export async function signUp(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.sendStatus(422);
  }

  const existingUsers = getUserByEmail(email);

  if (existingUsers.rowCount > 0) {
    return res.sendStatus(409);
  }

  signUpService(name, email, password);

  res.sendStatus(201);
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.sendStatus(422);
  }

  const { rows } = getUserByEmail(email);
  const [user] = rows;

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.sendStatus(401);
  }

  const token = signInService(user);

  res.send({
    token,
  });
}

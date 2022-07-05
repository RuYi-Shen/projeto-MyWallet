import bcrypt from "bcrypt";
import { addUser } from "../repositories/authRepository.js";

export async function signUpService(user) {
  const { name, email, password } = user;

  const hashedPassword = bcrypt.hashSync(password, 12);

  addUser(name, email, hashedPassword);
}

export async function signInService(user) {
  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET
  );

  return token;
}

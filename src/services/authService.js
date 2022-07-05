import bcrypt from "bcrypt";
import { addUser, getUserByEmail } from "../repositories/authRepository.js";

export async function signUpService(user) {
    const { name, email, password } = user;
    if (!name || !email || !password) {
        return res.sendStatus(422);
      }
    
      const existingUsers = getUserByEmail(email);
    
      if (existingUsers.rowCount > 0) {
        return res.sendStatus(409);
      }
    
      const hashedPassword = bcrypt.hashSync(password, 12);
    
      addUser(name, email, hashedPassword);
}

export async function signInService(login){
    const { email, password } = login;
    if (!email || !password) {
        return res.sendStatus(422);
      }
    
      const { rows } = getUserByEmail(email);
      const [user] = rows;
    
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.sendStatus(401);
      }
    
      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET
      );

      return token;
}
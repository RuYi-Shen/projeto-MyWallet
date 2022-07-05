import bcrypt from "bcrypt";
import connection from "../database.js";
import { addUser, getUserByEmail } from "../repositories/authRepository.js";

export async function signUp(req, res) {
    try {
        const { name, email, password } = req.body;
    
        if (!name || !email || !password) {
          return res.sendStatus(422);
        }
    
        const existingUsers = getUserByEmail(email);

        if (existingUsers.rowCount > 0) {
          return res.sendStatus(409);
        }
    
        const hashedPassword = bcrypt.hashSync(password, 12);
    
        addUser(name, email, hashedPassword);
    
        res.sendStatus(201);
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
}

export async function signIn(req, res) {
    try {
        const { email, password } = req.body;
    
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
    
        res.send({
          token,
        });
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
}

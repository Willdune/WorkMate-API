import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function createToken(uuid: string): string {
  return jwt.sign({ id: uuid }, "Oppenheimer", {
    expiresIn: 43200, //12 horas
  }); //TODO cambiar esto a un dotenv¿
}

export async function comparePassword(requestPassword: string, dbPassword: string): Promise<boolean> {
  return await bcrypt.compare(requestPassword, dbPassword);
}

export async function encryptPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 5);
}

export const verifyToken = async (req : any, res : any, next : any) =>{
  const token = req.headers["access-token"];
  console.log(token);
  if(!token) return res.status(403).json({message: "No token provided"});

  const decoded = jwt.verify(token, "Oppenheimer");
  console.log(decoded);
}


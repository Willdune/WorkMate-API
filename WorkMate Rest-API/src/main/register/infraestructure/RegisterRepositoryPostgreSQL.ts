import { QueryResult } from "pg";

import { PostgreSqlConnectionPool as pool } from "../../../shared/services/PostgreSqlConnectionPool";
import { RegisterRepository } from "../domain/repositories/RegisterRepository";
import { DatabaseError } from "../../login/infraestructure/models/DatabaseError";

export default class RegisterRepositoryPostgreSQL
  implements RegisterRepository
{
 
  public async checkUserExists(email: string): Promise<boolean> {
    try {
      return this.toBool(
        await pool.query(
          "SELECT uuid FROM users WHERE email = $1 AND withdrawn = FALSE",
          [email]
        )
      );
    } catch (e) {
      throw new DatabaseError((e as Error).message);
    }
  }

  public async createUser(email: string, password: string): Promise<boolean> {
    try {
      return this.toBool(
        await pool.query(
          "INSERT INTO public.users (uuid, email, password, withdrawn, creation_date) VALUES(uuid_generate_v4(), $1, $2, false, current_timestamp);",
          [email, password]
        )
      );
    } catch (e) {
      throw new DatabaseError((e as Error).message);
    }
  }

  private toBool(rs: QueryResult<any>): boolean {
    if (rs.rowCount > 0) {
      return true;
    } else {
      return false;
    }
  }
}

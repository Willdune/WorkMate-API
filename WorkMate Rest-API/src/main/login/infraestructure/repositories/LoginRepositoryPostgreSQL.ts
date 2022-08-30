import { QueryResult } from "pg";
import { LoginRepository } from "../../domain/repositories/LoginRepository";
import { LoginUserDTO } from "../models/LoginUserDTO";
import { PostgreSqlConnectionPool as pool } from "../../../../shared/services/PostgreSqlConnectionPool";
import { IncorrectCredentialsError } from "../../domain/models/IncorrectCredentialsError";
import { DatabaseError } from "../models/DatabaseError";

export default class LoginRepositoryPostgreSQL implements LoginRepository {
  public async getLogin(email: string): Promise<LoginUserDTO | undefined> {
    let result;
    try {
      result = await pool.query(
        "SELECT uuid, password FROM users WHERE email = $1 AND withdrawn = FALSE",
        [email]
      );
    } catch (e) {
      throw new DatabaseError((e as Error).message);
    }
    return this.toDao(result);
  }

  public async setLastLogin(email: string): Promise<boolean> {
    try {
      return this.toBool(
        await pool.query(
          "UPDATE public.users SET last_access=current_timestamp WHERE email=$1",
          [email]
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

  private toDao(rs: QueryResult<any>): LoginUserDTO | undefined {
    if (rs.rowCount == 0) throw new IncorrectCredentialsError();

    return {
      uuid: rs.rows[0]["uuid"],
      password: rs.rows[0]["password"],
    };
  }
}

import { Pool } from "pg";

export var PostgreSqlConnectionPool: Pool;

export function createPool(pool: Pool): void {
  PostgreSqlConnectionPool = pool;
}

import client from '../utils/database'

export type Status = {
  id?: number
  status: string
}

export class StatusClass {
  async index(): Promise<Status[]> {
    const sql = 'SELECT id,status FROM statutes'
    const conn = await client.connect()
    const result = await conn.query(sql)
    conn.release()
    return result.rows
  }

  async show(id: number): Promise<Status> {
    const sql = 'SELECT id,status FROM statutes WHERE id=($1)'
    const conn = await client.connect()
    const result = await conn.query(sql, [id])
    conn.release()
    return result.rows[0]
  }

  async create(obj: Status): Promise<Status> {
    const sql = 'INSERT INTO statutes (status) VALUES($1) RETURNING id,status'
    const conn = await client.connect()
    const result = await conn.query(sql, [obj.status])
    conn.release()
    return result.rows[0]
  }
}

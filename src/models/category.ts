import client from '../utils/database'

export type Category = {
  id?: number
  category: string
}

export class CategoryClass {
  async index(): Promise<Category[]> {
    const sql = 'SELECT id,category FROM categories'
    const conn = await client.connect()
    const result = await conn.query(sql)
    conn.release()
    return result.rows
  }

  async show(id: number): Promise<Category> {
    const sql = 'SELECT id,category FROM categories WHERE id=($1)'
    const conn = await client.connect()
    const result = await conn.query(sql, [id])
    conn.release()
    return result.rows[0]
  }

  async create(obj: Category): Promise<Category> {
    const sql =
      'INSERT INTO categories (category) VALUES($1) RETURNING id,category'
    const conn = await client.connect()
    const result = await conn.query(sql, [obj.category])
    conn.release()
    return result.rows[0]
  }
}

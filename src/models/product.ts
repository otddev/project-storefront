import client from '../utils/database'

export type Product = {
  id?: number
  p_name: string
  price: number
  category: number
}

export type ProductReport = {
  id?: number
  p_name: string
  price: number
  category: number
  total: number
}

export class ProductClass {
  async index(category = ''): Promise<Product[]> {
    const sql =
      "SELECT p.p_name, p.price, c.category FROM products p INNER JOIN categories c ON c.id = p.category WHERE c.category ILIKE '%' || $1 || '%'"
    const conn = await client.connect()
    const result = await conn.query(sql, [category])
    conn.release()
    return result.rows
  }

  async top(): Promise<ProductReport[]> {
    const sql =
      'SELECT p.p_name, p.price, c.category, (SELECT COUNT (*) FROM orders_products WHERE product_id = p.id) AS total FROM products p INNER JOIN categories c ON c.id = p.category ORDER BY total DESC LIMIT 5'
    const conn = await client.connect()
    const result = await conn.query(sql)
    conn.release()
    return result.rows
  }

  async show(id: number): Promise<Product> {
    const sql =
      'SELECT p.p_name, p.price, c.category FROM products p INNER JOIN categories c ON c.id = p.category WHERE p.id=($1)'
    const conn = await client.connect()
    const result = await conn.query(sql, [id])
    conn.release()
    return result.rows[0]
  }

  async create(obj: Product): Promise<{ status: string }> {
    const sql =
      'INSERT INTO products (p_name, price, category) VALUES ($1,$2,$3) RETURNING *'
    const conn = await client.connect()
    const result = await conn.query(sql, [obj.p_name, obj.price, obj.category])
    const o = result.rows[0]
    conn.release()
    return o
  }
}

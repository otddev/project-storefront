import client from '../utils/database'

export type Order = {
  id?: number
  user_id: number
  status: number
}

export type OrderProduct = {
  id?: number
  order_id: number
  product_id: number
  quantity: number
  total?: number
}

export class OrderClass {
  async cart(user_id: number, category = '', status = ''): Promise<Order[]> {
    const sql =
      "SELECT op.order_id, p.p_name, p.price, op.quantity,op.total, u.username, c.category, s.status FROM orders_products op INNER JOIN orders o ON o.id = op.order_id INNER JOIN products p ON p.id = op.product_id INNER JOIN users u ON u.id = o.user_id INNER JOIN categories c ON c.id = p.category INNER JOIN statutes s ON s.id = o.status WHERE o.user_id = ($1) AND c.category ILIKE '%' || $2 || '%' AND s.status ILIKE '%' || $3 || '%'"
    const conn = await client.connect()
    const result = await conn.query(sql, [user_id, category, status])
    conn.release()
    return result.rows
  }

  async show(order_id: number, user_id: number): Promise<Order> {
    const sql =
      'SELECT op.order_id, p.p_name, p.price, op.quantity,op.total, u.username, c.category, s.status FROM orders_products op INNER JOIN orders o ON o.id = op.order_id INNER JOIN products p ON p.id = op.product_id INNER JOIN users u ON u.id = o.user_id INNER JOIN categories c ON c.id = p.category INNER JOIN statutes s ON s.id = o.status WHERE o.user_id = ($1) AND op.order_id = ($2)'
    const conn = await client.connect()
    const result = await conn.query(sql, [user_id, order_id])
    conn.release()
    return result.rows[0]
  }

  async create(obj: Order): Promise<Order> {
    const sql =
      'INSERT INTO orders (user_id, status ) VALUES ($1,$2) RETURNING *'
    const conn = await client.connect()
    const result = await conn.query(sql, [obj.user_id, obj.status])
    const o = result.rows[0]
    conn.release()
    return o
  }

  async add_product(obj: OrderProduct): Promise<OrderProduct> {
    const sql =
      'INSERT INTO orders_products (order_id,product_id,quantity,total) VALUES ($1,$2,$3,(SELECT ($3) * price FROM products WHERE id = ($2))) RETURNING *'
    const conn = await client.connect()
    const result = await conn.query(sql, [
      obj.order_id,
      obj.product_id,
      obj.quantity
    ])
    const o = result.rows[0]
    conn.release()
    return o
  }

  async update(obj: Order): Promise<Order> {
    const sql =
      'UPDATE orders SET status = $3 WHERE id=($1) and user_id = ($2) RETURNING *'
    const conn = await client.connect()
    const result = await conn.query(sql, [obj.id, obj.user_id, obj.status])
    const o = result.rows[0]
    conn.release()
    return o
  }
}

import bcrypt from 'bcrypt'
import { config } from '../utils/config_init'
import client from '../utils/database'

export type User = {
  id: number
  firstname: string
  lastname: string
  username: string
  password: string
  email: string
  role?: string
}

export type UserCreate = {
  firstname: string
  lastname: string
  username: string
  password: string
  email: string
  role?: string
}

export class UserClass {
  async index(): Promise<User[]> {
    const sql = 'SELECT id,firstname,lastname,username,email FROM users'
    const conn = await client.connect()
    const result = await conn.query(sql)
    conn.release()
    return result.rows
  }

  async show(id: number): Promise<User> {
    const sql =
      'SELECT id,firstname,lastname,username,email FROM users WHERE id=($1)'
    const conn = await client.connect()
    const result = await conn.query(sql, [id])
    conn.release()
    return result.rows[0]
  }

  async create(u: UserCreate): Promise<User> {
    const sql =
      'INSERT INTO users (firstname, lastname, username, password, email, role) VALUES($1, $2, $3, $4, $5, $6) RETURNING id,firstname,password,lastname,username,email,role'
    const hash = await bcrypt.hash(
      u.password + config.pepper,
      parseInt(config.salt)
    )

    const conn = await client.connect()
    const result = await conn.query(sql, [
      u.firstname,
      u.lastname,
      u.username,
      hash,
      u.email,
      'customer'
    ])
    conn.release()
    return result.rows[0]
  }

  async update(u: User): Promise<User> {
    const sql =
      'UPDATE users SET firstname = $2,lastname = $3, username = $4, password = $5, email = $6 WHERE id=($1) RETURNING id,firstname,lastname,username,email'
    const conn = await client.connect()
    const hash = await bcrypt.hash(
      u.password + config.pepper,
      parseInt(config.salt)
    )
    const result = await conn.query(sql, [
      u.id,
      u.firstname,
      u.lastname,
      u.username,
      hash,
      u.email
    ])
    const user = result.rows[0]
    conn.release()
    return user
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    const sql = 'SELECT * FROM users WHERE username=($1)'
    const conn = await client.connect()
    const result = await conn.query(sql, [username])
    conn.release()

    if (result.rows.length) {
      const user = result.rows[0]
      if (bcrypt.compareSync(password + config.pepper, user.password)) {
        return user
      }
    }
    return null
  }
}

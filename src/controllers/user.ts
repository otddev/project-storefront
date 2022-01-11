import { Request, Response } from 'express'
import { User, UserClass, UserCreate } from '../models/user'
import { ErrorAPI } from '../utils/errors'
import jwt from 'jsonwebtoken'
import { config } from '../utils/config_init'

const user = new UserClass()

const index = async (_req: Request, res: Response) => {
  const users = await user.index().catch((err) => {
    throw new ErrorAPI('Bad Request', 400, err)
  })
  res.json(users)
}

const show = async (req: Request, res: Response) => {
  const u = await user.show(parseInt(req.params.id)).catch((err) => {
    throw new ErrorAPI('Bad Request', 400, err)
  })
  res.json(u)
}

const create = async (req: Request, res: Response) => {
  if (
    !req.body.firstname ||
    !req.body.lastname ||
    !req.body.username ||
    !req.body.password ||
    !req.body.email
  ) {
    res.status(400)
    res.json({ status: 'Missing parameters for user creation.' })
    return false
  }

  const u: UserCreate = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    role: 'customer'
  }

  try {
    const result = await user.create(u)
    const token = jwt.sign({ user: result }, config.secret)
    res.json(token)
  } catch (err) {
    throw new ErrorAPI('Bad Request', 400, err)
  }
}

const update = async (req: Request, res: Response) => {
  const u: User = {
    id: parseInt(req.params.id),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  }

  const updated = await user.update(u).catch((err) => {
    throw new ErrorAPI('Service Error', 500, err)
  })
  res.json(updated)
}

export default {
  index,
  show,
  create,
  update
}

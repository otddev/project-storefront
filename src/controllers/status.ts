import { Request, Response } from 'express'
import { Status, StatusClass } from '../models/statutes'
import { ErrorAPI } from '../utils/errors'

const obj = new StatusClass()

const index = async (_req: Request, res: Response) => {
  const users = await obj.index().catch((err) => {
    throw new ErrorAPI('Bad Request', 400, err)
  })
  res.json(users)
}

const show = async (req: Request, res: Response) => {
  const u = await obj.show(parseInt(req.params.id)).catch((err) => {
    throw new ErrorAPI('Bad Request', 400, err)
  })
  res.json(u)
}

const create = async (req: Request, res: Response) => {
  if (!req.body.status) {
    res.status(400)
    res.json({ status: 'Missing parameters for status creation.' })
    return false
  }

  const o: Status = {
    status: req.body.status
  }

  try {
    const result = await obj.create(o)
    res.json(result)
  } catch (err) {
    throw new ErrorAPI('Bad Request', 400, err)
  }
}

export default {
  index,
  show,
  create
}

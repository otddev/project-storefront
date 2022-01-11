import { Request, Response } from 'express'
import { Category, CategoryClass } from '../models/category'
import { ErrorAPI } from '../utils/errors'

const obj = new CategoryClass()

const index = async (_req: Request, res: Response) => {
  const users = await obj.index().catch((err) => {
    throw new ErrorAPI('Bad Request', 400, err)
  })
  res.json(users)
}

const show = async (req: Request, res: Response) => {
  const u = await obj.show(parseInt(req.params.id)).catch((err) => {
    throw new ErrorAPI('Service Error', 500, err)
  })
  res.json(u)
}

const create = async (req: Request, res: Response) => {
  if (!req.body.category) {
    res.status(400)
    res.json({ status: 'Missing parameters for category creation.' })
    return false
  }

  const o: Category = {
    category: req.body.category
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

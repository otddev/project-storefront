import { Request, Response } from 'express'
import { Category, CategoryClass } from '../models/category'
import { ErrorAPI } from '../utils/errors'

const obj = new CategoryClass()

const index = async (_req: Request, res: Response) => {
  const o = await obj.index().catch((err) => {
    throw new ErrorAPI('Bad Request', 400, err)
  })
  res.json(o)
}

const show = async (req: Request, res: Response) => {
  const o = await obj.show(parseInt(req.params.id)).catch((err) => {
    throw new ErrorAPI('Bad Request', 400, err)
  })
  res.json(o)
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

  const result = await obj.create(o).catch((err) => {
    throw new ErrorAPI('Bad Request', 400, err)
  })
  res.json(result)
}

export default {
  index,
  show,
  create
}

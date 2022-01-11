import { Request, Response } from 'express'
import { Product, ProductClass } from '../models/product'
import { ErrorAPI } from '../utils/errors'

const obj = new ProductClass()

const index = async (req: Request, res: Response) => {
  let category = ''
  if (req.query) {
    const filter = req.query
    if ('category' in filter) {
      if (req.query['category'] !== undefined) {
        category = req.query['category'].toString()
      }
    }
  }

  const o = await obj.index(category).catch((err) => {
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

const top = async (req: Request, res: Response) => {
  const o = await obj.top().catch((err) => {
    throw new ErrorAPI('Bad Request', 400, err)
  })
  res.json(o)
}

const create = async (req: Request, res: Response) => {
  if (!req.body.p_name || !req.body.price || !req.body.category) {
    res.status(400)
    res.json({ status: 'Missing parameters for product creation.' })
    return false
  }

  const u: Product = {
    p_name: req.body.p_name,
    price: req.body.price,
    category: req.body.category
  }

  try {
    const result = await obj.create(u)
    res.json(result)
  } catch (err) {
    throw new ErrorAPI('Bad Request', 400, err)
  }
}

export default {
  index,
  show,
  top,
  create
}

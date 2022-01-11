import { Request, Response } from 'express'
import { Order, OrderProduct, OrderClass } from '../models/order'
import { ErrorAPI } from '../utils/errors'

const obj = new OrderClass()

const cart = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(400)
    res.json({ status: 'Missing parameters for order report.' })
    return false
  }

  let category = ''
  let status = ''
  if (req.query) {
    const filter = req.query
    if ('category' in filter) {
      if (req.query['category'] !== undefined) {
        category = req.query['category'].toString()
      }
    }

    if ('status' in filter) {
      if (req.query['status'] !== undefined) {
        status = req.query['status'].toString()
      }
    }
  }

  const o = await obj.cart(req.user.id, category, status).catch((err) => {
    throw new ErrorAPI('Bad Request', 400, err)
  })
  res.json(o)
}

const show = async (req: Request, res: Response) => {
  if (!req.user || !req.params.id) {
    res.status(400)
    res.json({ status: 'Missing parameters for order report.' })
    return false
  }

  const o = await obj
    .show(parseInt(req.params.id), req.user.id)
    .catch((err) => {
      throw new ErrorAPI('Bad Request', 400, err)
    })
  res.json(o)
}

const create = async (req: Request, res: Response) => {
  if (!req.user || !req.body.status) {
    res.status(400)
    res.json({ status: 'Missing parameters for order creation.' })
    return false
  }

  const o: Order = {
    user_id: req.user.id,
    status: req.body.status
  }

  try {
    const result = await obj.create(o)
    res.json(result)
  } catch (err) {
    throw new ErrorAPI('Bad Request', 400, err)
  }
}

const add_product = async (req: Request, res: Response) => {
  if (!req.params.id || !req.body.product_id || !req.body.quantity) {
    res.status(400)
    res.json({ status: 'Missing parameters for adding product order.' })
    return false
  }

  const o: OrderProduct = {
    order_id: parseInt(req.params.id),
    product_id: req.body.product_id,
    quantity: req.body.quantity
  }

  try {
    const result = await obj.add_product(o)
    res.json(result)
  } catch (err) {
    throw new ErrorAPI('Bad Request', 400, err)
  }
}

const update = async (req: Request, res: Response) => {
  if (!req.user || !req.body.status) {
    res.status(400)
    res.json({ status: 'Missing parameters for order update.' })
    return false
  }
  const o: Order = {
    id: parseInt(req.params.id),
    user_id: req.user.id,
    status: req.body.status
  }

  const updated = await obj.update(o).catch((err) => {
    throw new ErrorAPI('Bad Request', 400, err)
  })
  res.json(updated)
}

export default {
  cart,
  show,
  create,
  add_product,
  update
}

import express from 'express'
import user from './user'
import category from './category'
import status from './status'
import products from './product'
import orders from './order'
import { authenticate } from '../controllers/auth'

const router = express.Router()

router.use('/users', user)
router.use('/categories', category)
router.use('/statutes', status)
router.use('/products', products)
router.use('/orders', orders)
router.post('/login', authenticate)

router.get('/', (_req, res) => {
  res.send({ status: 'API Service Available' })
})

export default router

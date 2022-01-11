import express from 'express'
import controller from '../controllers/order'
import { verify_auth, grant } from '../controllers/auth'

const router = express.Router()
router.get('/:id', verify_auth, grant('read:any', 'order'), controller.show)
router.get('/', verify_auth, grant('read:any', 'order'), controller.cart)
router.post(
  '/:id',
  verify_auth,
  grant('create:any', 'order'),
  controller.add_product
)
router.post('/', verify_auth, grant('create:any', 'order'), controller.create)

export default router

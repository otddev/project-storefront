import express from 'express'
import controller from '../controllers/category'
import { verify_auth, grant } from '../controllers/auth'

const router = express.Router()
router.get('/:id', controller.show)
router.get('/', controller.index)
router.post(
  '/',
  verify_auth,
  grant('create:any', 'category'),
  controller.create
)

export default router

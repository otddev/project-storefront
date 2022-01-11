import express from 'express'
import controller from '../controllers/user'
import { verify_auth, grant_profile } from '../controllers/auth'

const router = express.Router()
router.get(
  '/:id',
  verify_auth,
  grant_profile('read:any', 'user'),
  controller.show
)
router.get(
  '/',
  verify_auth,
  grant_profile('read:any', 'user'),
  controller.index
)
router.post(
  '/',
  verify_auth,
  grant_profile('create:any', 'user'),
  controller.create
)
router.put(
  '/:id',
  verify_auth,
  grant_profile('update:any', 'user'),
  verify_auth,
  controller.update
)

export default router

import express from 'express'
import controller from '../controllers/status'
import { verify_auth, grant } from '../controllers/auth'

const router = express.Router()
router.get('/:id', controller.show)
router.get('/', controller.index)
router.post('/', verify_auth, grant('create:any', 'status'), controller.create)

export default router

import express from 'express'
import controller from '../controllers/product'
import { verify_auth, grant } from '../controllers/auth'

const router = express.Router()
router.get('/top', controller.top)
router.get('/:id', controller.show)
router.get('/', controller.index)
router.post('/', verify_auth, grant('create:any', 'product'), controller.create)

export default router

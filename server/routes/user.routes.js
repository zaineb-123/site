import express from 'express'
import { login } from '../services/auth.js'
const router = express.Router()
router.post('/login',login)
export default router
import supertest from 'supertest'
import { app } from '../server'

/*
Optional Modules
import ErrnoException = NodeJS.ErrnoException
import routes from '../handlers/default'
import { logger } from '../utils/logger'
*/

const request = supertest(app)

describe('Test Default API Endpoint', () => {
  // Test: GET /api/users/
  it('GET /api/.', async () => {
    const res = await request.get('/api/')
    expect(res.status).toBe(200)
  })
})

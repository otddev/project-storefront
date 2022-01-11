import supertest from 'supertest'
import app from '../../server'

let token: string

const request = supertest(app)

describe('API Endpoint Test', () => {
  it('[POST] /api/login | Admin Authentication', async () => {
    const user = { username: 'sysadmin', password: 'P@ssword00' }
    const res = await request
      .post('/api/login')
      .send(user)
      .set('Accept', 'application/json')
    expect(res.status).toBe(200)
    expect(res.body).toBeTruthy()
    token = res.body
  })

  it('[POST] /api/statutes | Status Create', async () => {
    const obj = {
      status: 'dummy-api'
    }
    const res = await request
      .post('/api/statutes')
      .set('Authorization', `Bearer ${token}`)
      .send(obj)
      .set('Accept', 'application/json')
    expect(res.status).toBe(200)
  })

  it('[GET] /api/statutes | Admin Only', async () => {
    const res = await request
      .get('/api/statutes')
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
  })

  it('[GET] /api/statutes/:id | Admin Only', async () => {
    const res = await request
      .get('/api/statutes/1')
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body).toEqual(
      jasmine.objectContaining({
        status: 'completed'
      })
    )
  })
})

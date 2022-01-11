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

  it('[POST] /api/orders | Order Create', async () => {
    const obj = {
      user_id: 1,
      status: 1
    }

    const res = await request
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(obj)
      .set('Accept', 'application/json')
    expect(res.status).toBe(200)
  })

  it('[POST] /api/orders/:id/ | Add Product to Order', async () => {
    const obj = {
      product_id: 1,
      quantity: 50
    }

    const res = await request
      .post('/api/orders/1')
      .set('Authorization', `Bearer ${token}`)
      .send(obj)
      .set('Accept', 'application/json')
    expect(res.status).toBe(200)
  })

  it('[GET] /api/orders | List Orders', async () => {
    const res = await request
      .get('/api/orders')
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
  })
})

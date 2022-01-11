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

  it('[POST] /api/products | Product Create', async () => {
    const obj = {
      p_name: 'Xbox Dummy',
      price: 40,
      category: 1
    }

    const res = await request
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send(obj)
      .set('Accept', 'application/json')
    expect(res.status).toBe(200)
  })

  it('[GET] /api/products | Admin Only', async () => {
    const res = await request.get('/api/products')
    expect(res.status).toBe(200)
  })

  it('[GET] /api/products/:id | Admin Only', async () => {
    const res = await request.get('/api/products/1')
    expect(res.status).toBe(200)
    expect(res.body).toEqual(
      jasmine.objectContaining({
        p_name: 'Sony Playstation 5'
      })
    )
  })

  it('[GET] /api/products/top | TOP 5 Products | Admin Only', async () => {
    const res = await request.get('/api/products/top')
    expect(res.status).toBe(200)
  })
})

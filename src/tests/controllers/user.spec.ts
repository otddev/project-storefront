import supertest from 'supertest'
import app from '../../server'

let token: string
let user_token: string

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

  it('[POST] /api/users | User Create', async () => {
    const user = {
      username: 'usertestapi',
      password: 'P@ssword00',
      email: 'user.test.api@onetechdude.com',
      firstname: 'User',
      lastname: 'Test'
    }

    const res = await request
      .post('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send(user)
      .set('Accept', 'application/json')

    expect(res.status).toBe(200)
  })

  it('[POST] /api/login | User Authentication', async () => {
    const user = { username: 'usertestapi', password: 'P@ssword00' }
    const res = await request
      .post('/api/login')
      .send(user)
      .set('Accept', 'application/json')
    expect(res.status).toBe(200)
    expect(res.body).toBeTruthy()
    user_token = res.body
  })

  it('[GET] /api/users | 401 for Customers', async () => {
    const res = await request
      .get('/api/users')
      .set('Authorization', `Bearer ${user_token}`)
    expect(res.status).toBe(401)
  })

  it('[GET] /api/users | 200 for Admins', async () => {
    const res = await request
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
  })

  it('[GET] /api/users | Admin Only', async () => {
    const res = await request
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
  })
  it('[GET] /api/users/:id | Admin Only', async () => {
    const res = await request
      .get('/api/users/2')
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body).toEqual(
      jasmine.objectContaining({
        username: 'usertestapi'
      })
    )
  })
  it('[GET] /api/users/:id | User Denied Accessing Wrong Profile', async () => {
    const res = await request
      .get('/api/users/1')
      .set('Authorization', `Bearer ${user_token}`)
    expect(res.status).toBe(401)
  })

  it('[PUT] /api/users/:id | Admin Only', async () => {
    const user = {
      username: 'usertestapi',
      password: 'P@ssword00',
      firstname: 'User Update',
      lastname: 'Test Update',
      email: 'user.test.api@onetechdude.com'
    }
    const res = await request
      .put('/api/users/2')
      .send(user)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body).toEqual(
      jasmine.objectContaining({
        id: 2,
        username: 'usertestapi',
        firstname: 'User Update',
        lastname: 'Test Update',
        email: 'user.test.api@onetechdude.com'
      })
    )
  })
  it('[PUT] /api/users/:id | User Denied Accessing Wrong Profile Update', async () => {
    const user = {
      username: 'sysadmin',
      password: 'P@ssword00',
      firstname: 'Admin Update',
      lastname: 'Admin Update',
      email: 'user.test@onetechdude.com'
    }
    const res = await request
      .put('/api/users/1')
      .send(user)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${user_token}`)
    expect(res.status).toBe(401)
  })

  it('[PUT] /api/users/:id | User Update Own Profile', async () => {
    const user = {
      username: 'usertestapi',
      password: 'P@ssword00',
      firstname: 'User Update 2',
      lastname: 'User Update 2',
      email: 'user.test.api@onetechdude.com'
    }
    const res = await request
      .put('/api/users/2')
      .send(user)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${user_token}`)
    expect(res.status).toBe(200)
    expect(res.body).toEqual(
      jasmine.objectContaining({
        id: 2,
        username: 'usertestapi',
        firstname: 'User Update 2',
        lastname: 'User Update 2',
        email: 'user.test.api@onetechdude.com'
      })
    )
  })
})

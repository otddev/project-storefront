import { User, UserClass } from '../../models/user'

const obj = new UserClass()

describe('User Model', () => {
  const test_obj: User = <User>{
    username: 'usertest',
    password: 'Password00',
    email: 'user.test@onetechdude.com',
    firstname: 'User',
    lastname: 'Test'
  }

  it('result: a single obj to be created', async () => {
    const result = await obj.create(test_obj)
    expect(result).toEqual(jasmine.objectContaining({ username: 'usertest' }))
  })

  it('result: return list of objects', async () => {
    const result = await obj.index()
    expect(result[0].username).toEqual('sysadmin')
  })

  it('result: return a specific object from data', async () => {
    const result = await obj.show(3)
    expect(result).toEqual(
      jasmine.objectContaining({ id: 3, username: 'usertest' })
    )
    test_obj.id = result.id
  })

  it('result: obj to be updated correctly', async () => {
    const updated_obj: User = test_obj
    updated_obj.firstname = 'Updated'

    const result = await obj.update(updated_obj)
    expect(result).toEqual(
      jasmine.objectContaining({
        firstname: 'Updated'
      })
    )
  })

  it('result: authentication success', async () => {
    const result = await obj.authenticate('usertest', 'Password00')
    expect(result).toEqual(
      jasmine.objectContaining({
        username: 'usertest'
      })
    )
  })
})

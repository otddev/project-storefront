import { Status, StatusClass } from '../../models/statutes'

const obj = new StatusClass()

describe('Status Model', () => {
  const test_obj: Status = <Status>{
    status: 'dummy'
  }

  it('result: a single obj to be created', async () => {
    const result = await obj.create(test_obj)
    expect(result).toEqual(jasmine.objectContaining({ status: 'dummy' }))
  })

  it('result: return list of objects', async () => {
    const result = await obj.index()
    expect(result[0].status).toEqual('completed')
  })

  it('result: return a specific object from data', async () => {
    const result = await obj.show(6)
    expect(result).toEqual(jasmine.objectContaining({ status: 'dummy' }))
    test_obj.id = result.id
  })
})

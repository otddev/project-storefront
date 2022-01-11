import { Category, CategoryClass } from '../../models/category'

const obj = new CategoryClass()

describe('Category Model', () => {
  const test_obj: Category = <Category>{
    category: 'dummy'
  }

  it('result: a single obj to be created', async () => {
    const result = await obj.create(test_obj)
    expect(result).toEqual(jasmine.objectContaining({ category: 'dummy' }))
  })

  it('result: return list of objects', async () => {
    const result = await obj.index()
    expect(result[0].category).toEqual('Consoles')
  })

  it('result: return a specific object from data', async () => {
    const result = await obj.show(7)
    expect(result).toEqual(jasmine.objectContaining({ category: 'dummy' }))
    test_obj.id = result.id
  })
})

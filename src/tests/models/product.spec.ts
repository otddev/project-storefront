import { Product, ProductClass } from '../../models/product'

const obj = new ProductClass()

describe('Product Model', () => {
  const test_obj: Product = <Product>{
    p_name: 'Xbox Console',
    price: 400.0,
    category: 1
  }

  it('result: a single obj to be created', async () => {
    const result = await obj.create(test_obj)
    expect(result).toEqual(jasmine.objectContaining({ p_name: 'Xbox Console' }))
  })

  it('result: return list of objects', async () => {
    const result = await obj.index()
    expect(result[0].p_name).toEqual('Sony Playstation 5')
  })

  it('result: return top 5 list of objects', async () => {
    const result = await obj.top()
    expect(result[0].p_name).toEqual('Sony Playstation 5')
  })

  it('result: return a specific object from data', async () => {
    const result = await obj.show(7)
    expect(result).toEqual(jasmine.objectContaining({ p_name: 'Xbox Console' }))
    test_obj.id = result.id
  })
})

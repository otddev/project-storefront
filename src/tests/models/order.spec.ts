import { Order, OrderProduct, OrderClass } from '../../models/order'

const obj = new OrderClass()

describe('Order Model', () => {
  const test_obj: Order = <Order>{
    user_id: 1,
    status: 1
  }

  const test_child_obj: OrderProduct = <OrderProduct>{
    order_id: 1,
    product_id: 1,
    quantity: 10
  }

  it('result: a single obj to be created', async () => {
    const result = await obj.create(test_obj)
    expect(result).toEqual(jasmine.objectContaining({ user_id: 1 }))
    test_obj.id = result.id
  })

  it('result: a single child obj to be created', async () => {
    const result = await obj.add_product(test_child_obj)
    expect(result).toBeDefined()
  })

  it('result: an obj to be updated', async () => {
    test_obj.status = 3
    const result = await obj.update(test_obj)
    expect(result).toEqual(jasmine.objectContaining({ status: 3 }))
  })

  it('result: return a specific object from data (no filter)', async () => {
    const result = await obj.cart(1, '', '')
    expect(result[0]).toEqual(jasmine.objectContaining({ order_id: 1 }))
  })

  it('result: return a specific object from data (category filter)', async () => {
    const result = await obj.cart(1, 'Consoles', '')
    expect(result[0]).toEqual(jasmine.objectContaining({ order_id: 1 }))
  })

  it('result: return a specific object from data (status filter)', async () => {
    const result = await obj.cart(1, '', 'Completed')
    expect(result[0]).toEqual(jasmine.objectContaining({ order_id: 1 }))
  })
})

import { AccessControl } from 'accesscontrol'

const roles = new AccessControl()

roles.grant('customer').readOwn('user').updateOwn('user')

roles
  .grant('admin')
  .extend('customer')
  .readAny('user')
  .updateAny('user')
  .createAny('user')

roles.grant('admin').updateAny('category').createAny('category')

roles.grant('admin').updateAny('status').createAny('status')

roles.grant('admin').updateAny('product').createAny('product')

roles.grant('customer').readOwn('order').createOwn('order')

roles
  .grant('admin')
  .extend('customer')
  .readAny('order')
  .updateAny('order')
  .createAny('order')

export default roles

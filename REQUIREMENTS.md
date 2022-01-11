# API Requirements
Below are the RESTFUL API design structure as well Postgres Database Engine Structure for the storefront back-end service.

(NOTE: It is recommended to follow the data structure order in so the foreign keys are assign correctly and no creation errors occur.)

## API Endpoints
### Products

<table>
  <thead>
    <tr>
      <th>API</th>
      <th>Method</th>
      <th>Endpoint</th>
      <th>Auth</th>
      <th>Args</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Index</td>
      <td>[GET]</td>
      <td>/api/products/</td>
      <td>no</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>Show</td>
      <td>[GET]</td>
      <td>/api/products/:id</td>
      <td>no</td>
      <td>[id]</td>
      <td></td>
    </tr>
    <tr>
      <td>Create</td>
      <td>[POST]</td>
      <td>/api/products/</td>
      <td>yes</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>Top 5 Products</td>
      <td>[GET]</td>
      <td>/api/products/:?filter=top</td>
      <td>no</td>
      <td>"top"</td>
      <td>[ADDED]</td>
    </tr>
    <tr>
      <td>By Category</td>
      <td>[GET]</td>
      <td>/api/products/:?filter=category</td>
      <td>no</td>
      <td>[category]</td>
      <td>[ADDED]</td>
    </tr>
  </tbody>
</table>

### Users
<table>
  <thead>
    <tr>
      <th>API</th>
      <th>Method</th>
      <th>Endpoint</th>
      <th>Auth</th>
      <th>Args</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Index</td>
      <td>[GET]</td>
      <td>/api/users/</td>
      <td>yes</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>Show</td>
      <td>[GET]</td>
      <td>/api/users/:id</td>
      <td>yes</td>
      <td>[id]</td>
      <td></td>
    </tr>
    <tr>
      <td>Create</td>
      <td>[POST]</td>
      <td>/api/users/</td>
      <td>yes</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>Update</td>
      <td>[PUT]</td>
      <td>/api/users/:id</td>
      <td>yes</td>
      <td>[id]</td>
      <td>[ADDED]</td>
    </tr>
  </tbody>
</table>

### Orders
<table>
  <thead>
    <tr>
      <th>API</th>
      <th>Method</th>
      <th>Endpoint</th>
      <th>Auth</th>
      <th>Args</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Cart</td>
      <td>[GET]</td>
      <td>/api/orders/</td>
      <td>yes</td>
      <td></td>
      <td>[ADDED]<td>
    </tr>
    <tr>
      <td>Show</td>
      <td>[GET]</td>
      <td>/api/orders/:id</td>
      <td>yes</td>
      <td>[id]</td>
      <td></td>
    </tr>
    <tr>
      <td>Create</td>
      <td>[POST]</td>
      <td>/api/orders/</td>
      <td>yes</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>Update</td>
      <td>[PUT]</td>
      <td>/api/orders/:id</td>
      <td>yes</td>
      <td>[id]</td>
      <td>Update Status</td>
    </tr>
    <tr>
      <td>Add Product</td>
      <td>[POST]</td>
      <td>/api/orders/:id/:product_id</td>
      <td>yes</td>
      <td>[id][product_id]</td>
      <td></td>
    </tr>
    <tr>
      <td>By Category</td>
      <td>[GET]</td>
      <td>/api/orders/?filter=category</td>
      <td>yes</td>
      <td>[category]</td>
      <td>[ADDED]</td>
    </tr>
    <tr>
      <td>By Status</td>
      <td>[GET]</td>
      <td>/api/orders/?filter=status</td>
      <td>yes</td>
      <td>[status]</td>
      <td>[ADDED]</td>
    </tr>
  </tbody>
</table>

### Categories
<table>
  <thead>
    <tr>
      <th>API</th>
      <th>Method</th>
      <th>Endpoint</th>
      <th>Auth</th>
      <th>Args</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Index</td>
      <td>[GET]</td>
      <td>/api/categories/</td>
      <td>yes</td>
      <td>none</td>
      <td></td>
    </tr>
    <tr>
      <td>Show</td>
      <td>[GET]</td>
      <td>/api/categories/:id</td>
      <td>yes</td>
      <td>[id]</td>
      <td></td>
    </tr>
    <tr>
      <td>Create</td>
      <td>[POST]</td>
      <td>/api/categories/</td>
      <td>yes</td>
      <td>[category]</td>
      <td></td>
    </tr>
  </tbody>
</table>

### Statutes
<table>
  <thead>
    <tr>
      <th>API</th>
      <th>Method</th>
      <th>Endpoint</th>
      <th>Auth</th>
      <th>Args</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Index</td>
      <td>[GET]</td>
      <td>/api/statutes/</td>
      <td>yes</td>
      <td>none</td>
      <td>[ADDED]</td>
    </tr>
    <tr>
      <td>Show</td>
      <td>[GET]</td>
      <td>/api/statutes/:id</td>
      <td>yes</td>
      <td>[id]</td>
      <td>[ADDED]</td>
    </tr>
    <tr>
      <td>Create</td>
      <td>[POST]</td>
      <td>/api/statutes/</td>
      <td>yes</td>
      <td>[status]</td>
      <td>[ADDED]</td>
    </tr>
  </tbody>
</table>

## Data Structure

### Categories
- [ADDED] id
- [ADDED] category

### Statutes
- [ADDED] id
- [ADDED] status

### Products
- id
- p_name
- price
- [ADDED] category

### Users
- id
- firstName
- lastName
- password
- [ADDED] email

### Orders
- id
- user_id
- [ADDED] status

### Orders - Products
- id
- order_id
- product_id
- quantity
- [ADDED] total

## Table Schema

### Categories
```
Table: categories (id:serial[primary],category:varchar(50)[not null])
```
```
CREATE TABLE public.categories (
    id SERIAL PRIMARY KEY,
    category VARCHAR(50) NOT NULL
);

CREATE UNIQUE INDEX categories_id_uindex ON public.categories USING btree (id);

INSERT INTO PUBLIC.categories (id, category)
VALUES  (1, 'Consoles'),
        (2, 'Games'),
        (3, 'Accessories'),
        (4, 'Adapters'),
        (5, 'Parts');
```

### Statutes
```
Table: statutes (id:serial[primary],status:varchar(50)[not null])
```
```
CREATE TABLE public.statutes (
    id SERIAL PRIMARY KEY,
    status VARCHAR(50) NOT NULL
);

CREATE UNIQUE INDEX statutes_id_uindex ON public.statutes USING btree (id);

insert into public.statutes (id, status)
values  (1, 'completed'),
        (2, 'active'),
        (3, 'cancelled'),
        (4, 'pending');
```

### Products
```
Table: products (id:serial[primary],name:varchar(50)[not null],product_id:int,category:int)
```
```
CREATE TABLE public.products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price numeric NOT NULL,
    category integer NOT NULL,
    UNIQUE(name)
);

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_categories_id_fk FOREIGN KEY (category) REFERENCES public.categories(id);

INSERT INTO PUBLIC.products (p_name, price, category)
VALUES  ('Sony Playstation 5', 600,1),
        ('Final Fantasy VII Remake - PS5',60,2),
        ('PS5 Dual Shock Controller',40,3),
        ('PS5 Power Adapter',20,4),
        ('PS5 Side Panels',20,5);
```

### Users
#### Note: A system administrator account is created by default for user management tasks. (username: sysadmin, password: P@ssword00)
```
Table: users (id:serial[primary],firstName:varchar(50)[not null],lastName:varchar(50)[not null],password:varchar(50)[not null],email:varchar(50)[not null],role:int)
```
```
CREATE TABLE public.users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    password VARCHAR(150) NOT NULL,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    UNIQUE(username),
    UNIQUE(email)
);

INSERT INTO PUBLIC.users ( firstname, lastname, password, username, email, role)
VALUES  ('System', 'Administrator','$2b$05$PnzEXTsexT5QLkVPLfD/UeLTYUNMsVXLcAVB5cjwbTLu9XvSlU4He','sysadmin','sysadmin@onetechdude.com',1)
```
### Orders
```
Table: orders (id:serial[primary],user_id:int,status:int)
```
```
CREATE TABLE public.orders (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL,
    status integer NOT NULL,
);

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_statutes_id_fk FOREIGN KEY (status) REFERENCES public.statutes(id);

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);
```

### Orders - Products
```
Table: orders_products (id:serial[primary],order_id:int,product_id:int,quantity:int,total:numeric)
```
```
CREATE TABLE public.orders (
    id SERIAL PRIMARY KEY,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    total numeric NOT NULL
);

ALTER TABLE ONLY public.orders_products
    ADD CONSTRAINT orders_products_order_id_fk FOREIGN KEY (order_id) REFERENCES public.orders(id);

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_products_product_id_fk FOREIGN KEY (product_id) REFERENCES public.products(id);

```

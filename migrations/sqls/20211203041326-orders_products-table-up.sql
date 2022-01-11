CREATE TABLE public.orders_products (
    id SERIAL PRIMARY KEY,
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity numeric NOT NULL,
    total numeric NOT NULL
);

ALTER TABLE ONLY public.orders_products
    ADD CONSTRAINT orders_products_order_id_fk FOREIGN KEY (order_id) REFERENCES public.orders(id);

ALTER TABLE ONLY public.orders_products
    ADD CONSTRAINT orders_products_product_id_fk FOREIGN KEY (product_id) REFERENCES public.products(id);

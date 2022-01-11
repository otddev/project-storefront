CREATE TABLE public.products (
    id SERIAL PRIMARY KEY,
    p_name VARCHAR(50) NOT NULL,
    price numeric NOT NULL,
    category integer NOT NULL,
    UNIQUE(p_name)
);

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_categories_id_fk FOREIGN KEY (category) REFERENCES public.categories(id);

INSERT INTO PUBLIC.products (p_name, price, category)
VALUES  ('Sony Playstation 5', 600,1),
        ('Final Fantasy VII Remake - PS5',60,2),
        ('PS5 Dual Shock Controller',40,3),
        ('PS5 Power Adapter',20,4),
        ('PS5 Side Panels',20,5);

CREATE TABLE public.orders (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL,
    status integer NOT NULL
);

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_statutes_id_fk FOREIGN KEY (status) REFERENCES public.statutes(id);

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);

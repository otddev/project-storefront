CREATE TABLE public.statutes (
    id SERIAL PRIMARY KEY,
    status VARCHAR(50) NOT NULL,
    UNIQUE(status)
);

insert into public.statutes (status)
values  ('completed'),
        ('active'),
        ('cancelled'),
        ('pending');


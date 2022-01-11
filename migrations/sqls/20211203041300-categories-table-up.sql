CREATE TABLE public.categories (
    id SERIAL PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    UNIQUE(category)
);

INSERT INTO PUBLIC.categories (category)
VALUES  ('Consoles'),
        ('Games'),
        ('Accessories'),
        ('Adapters'),
        ('Parts');

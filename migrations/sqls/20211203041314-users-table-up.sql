CREATE TABLE public.users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    password VARCHAR(150) NOT NULL,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    role VARCHAR(25) NOT NULL,
    UNIQUE(username),
    UNIQUE(email)
);

INSERT INTO PUBLIC.users ( firstname, lastname, password, username, email, role)
VALUES  ('System', 'Administrator','$2b$05$PnzEXTsexT5QLkVPLfD/UeLTYUNMsVXLcAVB5cjwbTLu9XvSlU4He','sysadmin','sysadmin@onetechdude.com','admin')




-- public.users definition
-- Drop table
-- DROP TABLE public.users;
CREATE TABLE public.users (
    id uuid NOT NULL DEFAULT uuid_generate_v4 (),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    deleted bool NOT NULL DEFAULT FALSE,
    "name" text NOT NULL,
    email text NOT NULL,
    CONSTRAINT users_email_key UNIQUE (email),
    CONSTRAINT users_name_key UNIQUE (name),
    CONSTRAINT users_pkey PRIMARY KEY (id)
);


-- public.projects definition
-- Drop table
-- DROP TABLE public.projects;
CREATE TABLE public.projects (
    id uuid NOT NULL DEFAULT uuid_generate_v4 (),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    deleted bool NOT NULL DEFAULT FALSE,
    "name" text NOT NULL,
    owner_id uuid NOT NULL,
    CONSTRAINT projects_name_key UNIQUE (name),
    CONSTRAINT projects_pkey PRIMARY KEY (id)
);

-- public.projects foreign keys
ALTER TABLE public.projects
    ADD CONSTRAINT projects_owner_fkey FOREIGN KEY (owner_id) REFERENCES public.users (id);


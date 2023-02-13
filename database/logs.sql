-- public.logs definition
-- Drop table
-- DROP TABLE public.logs;
CREATE TABLE public.logs (
    id uuid NOT NULL DEFAULT uuid_generate_v4 (),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    deleted bool NOT NULL DEFAULT FALSE,
    start_date timestamptz NOT NULL,
    end_date timestamptz NOT NULL,
    user_and_project_id uuid NOT NULL,
    CONSTRAINT logs_pkey PRIMARY KEY (id)
);

-- public.logs foreign keys
ALTER TABLE public.logs
    ADD CONSTRAINT logs_user_and_project_id_fkey FOREIGN KEY (user_and_project_id) REFERENCES public.users_to_projects (id);


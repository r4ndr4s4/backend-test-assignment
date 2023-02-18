-- public.users_to_projects definition
-- Drop table
-- DROP TABLE public.users_to_projects;
CREATE TABLE public.users_to_projects (
    id uuid NOT NULL DEFAULT uuid_generate_v4 (),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    user_id uuid NOT NULL,
    project_id uuid NOT NULL,
    CONSTRAINT users_to_projects_pkey PRIMARY KEY (id),
    CONSTRAINT users_to_projects_un UNIQUE (user_id, project_id)
);

-- public.users_to_projects foreign keys
ALTER TABLE public.users_to_projects
    ADD CONSTRAINT users_to_projects_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects (id);

ALTER TABLE public.users_to_projects
    ADD CONSTRAINT users_to_projects_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users (id);


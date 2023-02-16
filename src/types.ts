export interface User {
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  name: string;
  email: string;
}

export interface Project {
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  name: string;
  owner_id: string;
}

export interface Log {
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  start_date: string;
  end_date: string;
  user_and_project_id: string;
}

export interface UsersToProjects {
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  user_id: string;
  project_id: string;
}

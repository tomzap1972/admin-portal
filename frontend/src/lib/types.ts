export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

export interface ContentItem {
  id: string;
  title: string;
  body: string;
  platform: "all" | "native" | "flutter";
  status: "draft" | "published" | "archived";
  createdAt: string;
  updatedAt: string;
}

export interface AppConfig {
  id: string;
  key: string;
  value: string;
  platform: "all" | "native" | "flutter";
  description: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

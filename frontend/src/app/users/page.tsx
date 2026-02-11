"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import Modal from "@/components/ui/Modal";
import type { User } from "@/lib/types";

const mockUsers: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "admin", status: "active", createdAt: "2024-01-15", updatedAt: "2024-03-01" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "editor", status: "active", createdAt: "2024-02-10", updatedAt: "2024-03-05" },
  { id: "3", name: "Bob Wilson", email: "bob@example.com", role: "viewer", status: "inactive", createdAt: "2024-01-20", updatedAt: "2024-02-15" },
];

const columns = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  {
    key: "role",
    header: "Role",
    render: (user: User) => (
      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full capitalize">
        {user.role}
      </span>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (user: User) => (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
        user.status === "active"
          ? "bg-green-100 text-green-700"
          : "bg-gray-100 text-gray-500"
      }`}>
        {user.status}
      </span>
    ),
  },
  { key: "createdAt", header: "Created" },
];

export default function UsersPage() {
  const [users] = useState<User[]>(mockUsers);
  const [showCreate, setShowCreate] = useState(false);
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button onClick={() => setShowCreate(true)}>+ Add User</Button>
      </div>

      <Card>
        <Table columns={columns} data={filteredUsers} />
      </Card>

      <Modal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        title="Add User"
        confirmLabel="Create User"
        onConfirm={() => setShowCreate(false)}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="viewer">Viewer</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
}

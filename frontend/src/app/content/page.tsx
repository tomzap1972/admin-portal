"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import Modal from "@/components/ui/Modal";
import type { ContentItem } from "@/lib/types";

const mockContent: ContentItem[] = [
  { id: "1", title: "Welcome Banner", body: "Welcome to our app!", platform: "all", status: "published", createdAt: "2024-02-01", updatedAt: "2024-03-01" },
  { id: "2", title: "Promo Card", body: "Check out our new features", platform: "native", status: "draft", createdAt: "2024-03-05", updatedAt: "2024-03-05" },
  { id: "3", title: "Onboarding Guide", body: "Get started with the app", platform: "flutter", status: "published", createdAt: "2024-01-15", updatedAt: "2024-02-20" },
];

const columns = [
  { key: "title", header: "Title" },
  {
    key: "platform",
    header: "Platform",
    render: (item: ContentItem) => (
      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full capitalize">
        {item.platform}
      </span>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (item: ContentItem) => {
      const colors = {
        published: "bg-green-100 text-green-700",
        draft: "bg-yellow-100 text-yellow-700",
        archived: "bg-gray-100 text-gray-500",
      };
      return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[item.status]}`}>
          {item.status}
        </span>
      );
    },
  },
  { key: "updatedAt", header: "Updated" },
];

export default function ContentPage() {
  const [content] = useState<ContentItem[]>(mockContent);
  const [showCreate, setShowCreate] = useState(false);
  const [search, setSearch] = useState("");

  const filteredContent = content.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Search content..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button onClick={() => setShowCreate(true)}>+ Add Content</Button>
      </div>

      <Card>
        <Table columns={columns} data={filteredContent} />
      </Card>

      <Modal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        title="Add Content"
        confirmLabel="Create"
        onConfirm={() => setShowCreate(false)}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Body</label>
            <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">All Platforms</option>
              <option value="native">Native Only</option>
              <option value="flutter">Flutter Only</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
}

"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import type { AppConfig } from "@/lib/types";

const mockConfigs: AppConfig[] = [
  { id: "1", key: "dark_mode", value: "true", platform: "all", description: "Enable dark mode theme", updatedAt: "2024-03-01" },
  { id: "2", key: "max_upload_size", value: "10MB", platform: "native", description: "Maximum file upload size", updatedAt: "2024-02-20" },
  { id: "3", key: "maintenance_mode", value: "false", platform: "all", description: "Enable maintenance mode", updatedAt: "2024-03-05" },
  { id: "4", key: "push_notifications", value: "true", platform: "flutter", description: "Enable push notifications", updatedAt: "2024-02-15" },
  { id: "5", key: "cache_ttl", value: "3600", platform: "all", description: "Cache time-to-live in seconds", updatedAt: "2024-01-30" },
];

export default function ConfigPage() {
  const [configs] = useState<AppConfig[]>(mockConfigs);
  const [showCreate, setShowCreate] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  const filteredConfigs = filter === "all"
    ? configs
    : configs.filter((c) => c.platform === filter || c.platform === "all");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {["all", "native", "flutter"].map((platform) => (
            <button
              key={platform}
              onClick={() => setFilter(platform)}
              className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors capitalize ${
                filter === platform
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {platform}
            </button>
          ))}
        </div>
        <Button onClick={() => setShowCreate(true)}>+ Add Config</Button>
      </div>

      <div className="grid gap-4">
        {filteredConfigs.map((config) => (
          <Card key={config.id}>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded text-gray-800">
                    {config.key}
                  </code>
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full capitalize">
                    {config.platform}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-2">{config.description}</p>
              </div>
              <div className="flex items-center gap-4">
                {config.value === "true" || config.value === "false" ? (
                  <div
                    className={`w-10 h-6 rounded-full flex items-center px-1 cursor-pointer transition-colors ${
                      config.value === "true" ? "bg-blue-600 justify-end" : "bg-gray-300 justify-start"
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full shadow" />
                  </div>
                ) : (
                  <code className="text-sm bg-gray-100 px-3 py-1 rounded font-mono">
                    {config.value}
                  </code>
                )}
                <Button variant="secondary" size="sm">Edit</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        title="Add Configuration"
        confirmLabel="Create"
        onConfirm={() => setShowCreate(false)}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Key</label>
            <input type="text" placeholder="e.g. feature_name" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      </Modal>
    </div>
  );
}

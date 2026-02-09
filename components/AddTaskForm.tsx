"use client";

import { useState } from "react";
import { createTask } from "@/lib/actions/task-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AddTaskForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await createTask(formData);

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
    } else {
      e.currentTarget.reset();
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-semibold text-gray-900">
            Task Title *
          </label>
          <Input
            id="title"
            name="title"
            placeholder="What needs to be done?"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="priority" className="text-sm font-semibold text-gray-900">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            className="w-full px-3 py-2 border-2 border-lumina-200 rounded-md focus:border-lumina-500 focus:ring-2 focus:ring-lumina-500 bg-white text-gray-900 font-medium"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM" defaultValue="MEDIUM">
              Medium
            </option>
            <option value="HIGH">High</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-semibold text-gray-900">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Add more details about this task..."
          rows={3}
          className="w-full px-3 py-2 border-2 border-lumina-200 rounded-md focus:border-lumina-500 focus:ring-2 focus:ring-lumina-500 bg-white text-gray-900 font-medium placeholder-gray-400"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="category" className="text-sm font-semibold text-gray-900">
            Category
          </label>
          <Input
            id="category"
            name="category"
            placeholder="e.g., Work, Personal"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="dueDate" className="text-sm font-semibold text-gray-900">
            Due Date
          </label>
          <Input id="dueDate" name="dueDate" type="date" />
        </div>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Creating task..." : "Add to Flow"}
      </Button>
    </form>
  );
}

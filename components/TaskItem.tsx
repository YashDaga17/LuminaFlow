"use client";

import { useState } from "react";
import { suggestDescription } from "@/lib/actions/ai-actions";
import { deleteTask, updateTask } from "@/lib/actions/task-actions";
import { Button } from "@/components/ui/button";

const statusColors = {
  TODO: "bg-gray-100 text-gray-800",
  IN_PROGRESS: "bg-blue-100 text-blue-800",
  DONE: "bg-green-100 text-green-800",
};

const priorityColors = {
  LOW: "text-green-600",
  MEDIUM: "text-yellow-600",
  HIGH: "text-red-600",
};

export default function TaskItem({ task }: { task: any }) {
  const [aiDescription, setAiDescription] = useState(task.description);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(task.status);

  async function handleAiSuggest() {
    setIsLoading(true);
    const suggestion = await suggestDescription(task.title);
    setAiDescription(suggestion);
    setIsLoading(false);
  }

  async function handleStatusChange(newStatus: string) {
    setStatus(newStatus);
    const formData = new FormData();
    formData.append("status", newStatus);
    await updateTask(task.id, formData);
  }

  async function handleDelete() {
    if (confirm("Are you sure you want to delete this task?")) {
      await deleteTask(task.id);
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl border-2 border-lumina-100 shadow-md hover:shadow-lg hover:border-lumina-300 transition-all">
      <div className="flex justify-between items-start gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-bold text-lg text-gray-800">{task.title}</h3>
            <span className={`text-xs font-semibold px-2 py-1 rounded ${statusColors[task.status as keyof typeof statusColors]}`}>
              {task.status}
            </span>
            {task.priority && (
              <span className={`text-xs font-semibold ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                ★ {task.priority}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600">
            {aiDescription || "No description yet."}
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            Delete
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <button
          onClick={handleAiSuggest}
          disabled={isLoading}
          className="text-sm text-lumina-600 hover:text-lumina-700 font-medium disabled:text-gray-400 transition-colors"
        >
          {isLoading ? "✨ Gemini is thinking..." : "✨ Suggest Description"}
        </button>

        <div className="flex gap-2 ml-auto">
          {["TODO", "IN_PROGRESS", "DONE"].map((s) => (
            <button
              key={s}
              onClick={() => handleStatusChange(s)}
              className={`text-xs px-3 py-1 rounded font-medium transition-all ${
                status === s
                  ? "bg-lumina-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {s.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
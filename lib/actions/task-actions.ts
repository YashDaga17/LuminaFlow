"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getCurrentUser } from "./auth-actions";

const taskSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  category: z.string().optional(),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).optional(),
  dueDate: z.string().optional(),
});

export async function createTask(formData: FormData) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { error: "Unauthorized" };
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const priority = (formData.get("priority") as string) || "MEDIUM";
    const category = formData.get("category") as string;
    const dueDate = formData.get("dueDate") as string;

    const validation = taskSchema.safeParse({
      title,
      description,
      priority,
      category,
      dueDate,
    });

    if (!validation.success) {
      const errorMessage = validation.error.flatten().fieldErrors;
      const firstError = Object.values(errorMessage)[0]?.[0] || "Validation failed";
      return { error: firstError };
    }

    await db.task.create({
      data: {
        title,
        description: description || null,
        priority,
        category: category || null,
        dueDate: dueDate ? new Date(dueDate) : null,
        userId: user.id,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Create task error:", error);
    return { error: "Failed to create task" };
  }
}

export async function updateTask(
  id: string,
  formData: FormData
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { error: "Unauthorized" };
    }

    // Verify task belongs to user
    const task = await db.task.findUnique({ where: { id } });
    if (!task || task.userId !== user.id) {
      return { error: "Task not found" };
    }

    const title = (formData.get("title") as string) || undefined;
    const description = formData.get("description") as string;
    const priority = formData.get("priority") as string;
    const category = formData.get("category") as string;
    const status = formData.get("status") as string;
    const dueDate = formData.get("dueDate") as string;

    const validation = taskSchema.partial().safeParse({
      title,
      description,
      priority,
      category,
      status,
      dueDate,
    });

    if (!validation.success) {
      const errorMessage = validation.error.flatten().fieldErrors;
      const firstError = Object.values(errorMessage)[0]?.[0] || "Validation failed";
      return { error: firstError };
    }

    await db.task.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(priority && { priority }),
        ...(category && { category }),
        ...(status && { status }),
        ...(dueDate && { dueDate: new Date(dueDate) }),
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Update task error:", error);
    return { error: "Failed to update task" };
  }
}

export async function deleteTask(id: string) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { error: "Unauthorized" };
    }

    // Verify task belongs to user
    const task = await db.task.findUnique({ where: { id } });
    if (!task || task.userId !== user.id) {
      return { error: "Task not found" };
    }

    await db.task.delete({
      where: { id },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Delete task error:", error);
    return { error: "Failed to delete task" };
  }
}

export async function getUserTasks() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { error: "Unauthorized", tasks: [] };
    }

    const tasks = await db.task.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return { success: true, tasks };
  } catch (error) {
    console.error("Get tasks error:", error);
    return { error: "Failed to fetch tasks", tasks: [] };
  }
}
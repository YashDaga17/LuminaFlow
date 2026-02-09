import { db } from "@/lib/db";
import TaskItem from "@/components/TaskItem";
import AddTaskForm from "@/components/AddTaskForm";
import UserNav from "@/components/UserNav";
import { getCurrentUser } from "@/lib/actions/auth-actions";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const tasks = await db.task.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-lumina-50 to-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-5xl font-extrabold text-lumina-700 mb-2">
              LuminaFlow
            </h1>
            <p className="text-lumina-600 text-lg font-medium">
              Full-stack Task Orchestrator with Gemini AI.
            </p>
          </div>
          <UserNav user={user} />
        </div>

        <section className="bg-white p-6 rounded-2xl shadow-md border border-lumina-200 mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Create a New Task
          </h2>
          <AddTaskForm />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Your Tasks ({tasks.length})
          </h2>
          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No tasks yet. Create your first task to get started!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
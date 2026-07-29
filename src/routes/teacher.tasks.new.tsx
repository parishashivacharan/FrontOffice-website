import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageHeader } from "@/components/AppShell";
import {
  addTaskStore,
  getTasksStore,
  deleteTaskStore,
  updateTaskStore,
  type Task,
} from "@/lib/mock-data";
import { getCurrentUser } from "@/lib/mock-auth";
import { Plus, CheckCircle2, Trash2, Edit2, AlertCircle, Send } from "lucide-react";

export const Route = createFileRoute("/teacher/tasks/new")({
  component: NewTaskPage,
});

function NewTaskPage() {
  const teacherUser = getCurrentUser();

  // Create form state
  const [courseId, setCourseId] = useState("room-division");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [due, setDue] = useState("2026-08-05");
  const [marks, setMarks] = useState(25);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  // Success Toast
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Dynamic Task List
  const [taskList, setTaskList] = useState<Task[]>([]);

  const refreshTasks = () => {
    const allTasks = getTasksStore();
    setTaskList(allTasks);
  };

  useEffect(() => {
    refreshTasks();
  }, []);

  const handlePublishTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    if (editingTaskId) {
      updateTaskStore(editingTaskId, {
        courseId,
        title,
        description,
        due,
        marks: Number(marks),
      });
      setSuccessMessage(`Task "${title}" updated successfully`);
      setEditingTaskId(null);
    } else {
      addTaskStore({
        courseId,
        title,
        description,
        due,
        marks: Number(marks),
        teacherId: teacherUser?.id,
      });
      setSuccessMessage(`Task "${title}" published for enrolled students`);
    }

    setTitle("");
    setDescription("");
    refreshTasks();

    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const handleDelete = (id: string, taskTitle: string) => {
    if (confirm(`Delete task "${taskTitle}"?`)) {
      deleteTaskStore(id);
      setSuccessMessage(`Task "${taskTitle}" removed`);
      refreshTasks();
      setTimeout(() => setSuccessMessage(null), 4000);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Teacher Task Management"
        subtitle="Create new task assignments for Room Division (Front Office Operations) or review and grade student submissions."
      />

      {/* Visibility Reminder Banner */}
      <div className="p-3.5 rounded-2xl bg-[#ffb084]/15 border border-[#ffb084]/30 text-xs text-[#0a0a0a] flex items-center gap-2 font-medium">
        <AlertCircle className="w-4 h-4 text-[#0a0a0a] shrink-0" />
        <span>Course Visibility: Tasks published here will be visible to all enrolled students and administrators.</span>
      </div>

      {/* Success Alert Banner */}
      {successMessage && (
        <div className="p-4 rounded-2xl bg-[#22c55e]/15 border border-[#22c55e]/30 text-[#0a0a0a] text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Task Creation / Edit Form */}
      <form
        onSubmit={handlePublishTask}
        className="bg-white border border-[#e5e5e5] rounded-3xl p-6 shadow-xs space-y-4"
      >
        <div className="font-medium text-sm text-[#0a0a0a] border-b border-[#e5e5e5] pb-3">
          {editingTaskId ? "Edit Published Task" : "Create New Task Assignment"}
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-[#3a3a3a] mb-1">
              Target Course / Subject
            </label>
            <input
              type="text"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              placeholder="e.g. Room Division - Front Office Operations"
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#e5e5e5] bg-white focus:outline-none focus:border-[#0a0a0a] font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-[#3a3a3a] mb-1">
              Task Title
            </label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Unit 1: Hubbart Formula Rate Setting Calculation"
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#e5e5e5] bg-white focus:outline-none focus:border-[#0a0a0a] font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-[#3a3a3a] mb-1">
              Due Date
            </label>
            <input
              type="date"
              required
              value={due}
              onChange={(e) => setDue(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#e5e5e5] bg-white focus:outline-none focus:border-[#0a0a0a] font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-[#3a3a3a] mb-1">
            Instructions / Description
          </label>
          <textarea
            rows={3}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detailed instructions for students..."
            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#e5e5e5] bg-white focus:outline-none focus:border-[#0a0a0a]"
          />
        </div>

        <div className="flex justify-between items-center pt-2">
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold uppercase text-[#3a3a3a]">Max Marks:</label>
            <input
              type="number"
              value={marks}
              onChange={(e) => setMarks(Number(e.target.value))}
              className="w-20 px-3 py-1.5 text-xs rounded-xl border border-[#e5e5e5]"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#0a0a0a] text-white text-xs font-semibold hover:bg-[#1a1a1a] transition-colors flex items-center gap-2"
          >
            <Send className="w-3.5 h-3.5" />
            {editingTaskId ? "Update Task" : "Publish Task to Students"}
          </button>
        </div>
      </form>

      {/* Published Tasks History & Management List */}
      <div className="bg-white border border-[#e5e5e5] rounded-3xl p-6 shadow-xs space-y-4">
        <h3 className="font-medium text-sm text-[#0a0a0a]">Your Published Tasks ({taskList.length})</h3>
        <div className="space-y-3">
          {taskList.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#6a6a6a]">
              No tasks published yet. Create your first task assignment above.
            </div>
          ) : (
            taskList.map((t) => (
              <div key={t.id} className="p-4 rounded-2xl border border-[#e5e5e5] bg-[#fffaf0]/40 flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold text-sm text-[#0a0a0a]">{t.title}</div>
                  <div className="text-xs text-[#6a6a6a] mt-0.5">Due: {t.due} · Marks: {t.marks}</div>
                  <p className="text-xs text-[#3a3a3a] mt-1">{t.description}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setEditingTaskId(t.id);
                      setCourseId(t.courseId);
                      setTitle(t.title);
                      setDescription(t.description);
                      setDue(t.due);
                      setMarks(t.marks);
                    }}
                    className="p-1.5 rounded-lg border border-[#e5e5e5] bg-white text-[#0a0a0a] hover:bg-[#faf5e8]"
                    title="Edit Task"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(t.id, t.title)}
                    className="p-1.5 rounded-lg border border-[#e5e5e5] bg-white text-[#ef4444] hover:bg-[#ef4444]/10"
                    title="Delete Task"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

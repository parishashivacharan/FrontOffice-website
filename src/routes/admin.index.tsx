import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/AppShell";
import { getCoursesStore, getTasksStore, getAnnouncementsStore } from "@/lib/mock-data";
import { getApprovedTeachers, getAllUsers } from "@/lib/mock-auth";
import { Users, BookOpen, UserCog, ClipboardList, Megaphone, Plus, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalCourses: 4,
    totalTasks: 4,
    totalAnnouncements: 3,
    totalApprovedTeachers: 3,
    totalUsers: 10,
  });
  const [announcementList, setAnnouncementList] = useState(getAnnouncementsStore());

  useEffect(() => {
    const courses = getCoursesStore();
    const tasks = getTasksStore();
    const ann = getAnnouncementsStore();
    const appTeachers = getApprovedTeachers();
    const users = getAllUsers();

    setStats({
      totalCourses: courses.length,
      totalTasks: tasks.length,
      totalAnnouncements: ann.length,
      totalApprovedTeachers: appTeachers.length,
      totalUsers: users.length,
    });
    setAnnouncementList(ann);
  }, []);

  return (
    <div>
      <PageHeader
        title="Scholaria Institute Dashboard"
        subtitle="Institute-wide administration, course oversight, teacher authorization, and platform analytics."
      />

      <div className="grid md:grid-cols-5 gap-4 mb-8">
        <div className="bg-card border border-border rounded-lg p-5 shadow-xs">
          <BookOpen className="h-5 w-5 text-primary mb-2" />
          <div className="text-2xl font-display font-bold">{stats.totalCourses}</div>
          <div className="text-xs text-muted-foreground mt-1 font-medium">Active Universes</div>
        </div>

        <div className="bg-card border border-border rounded-lg p-5 shadow-xs">
          <ClipboardList className="h-5 w-5 text-gold mb-2" />
          <div className="text-2xl font-display font-bold">{stats.totalTasks}</div>
          <div className="text-xs text-muted-foreground mt-1 font-medium">Total Tasks</div>
        </div>

        <div className="bg-card border border-border rounded-lg p-5 shadow-xs">
          <Megaphone className="h-5 w-5 text-amber-500 mb-2" />
          <div className="text-2xl font-display font-bold">{stats.totalAnnouncements}</div>
          <div className="text-xs text-muted-foreground mt-1 font-medium">Announcements</div>
        </div>

        <div className="bg-card border border-border rounded-lg p-5 shadow-xs">
          <UserCog className="h-5 w-5 text-purple-600 mb-2" />
          <div className="text-2xl font-display font-bold text-purple-700 dark:text-purple-300">
            {stats.totalApprovedTeachers}
          </div>
          <div className="text-xs text-muted-foreground mt-1 font-medium">
            Approved Teacher Emails
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-5 shadow-xs">
          <Users className="h-5 w-5 text-success mb-2" />
          <div className="text-2xl font-display font-bold text-success">{stats.totalUsers}</div>
          <div className="text-xs text-muted-foreground mt-1 font-medium">Total Users</div>
        </div>
      </div>

      <div className="mb-8 bg-card border border-border rounded-lg p-6 shadow-xs">
        <h2 className="font-display font-semibold text-lg mb-2 flex items-center gap-2">
          <Plus className="w-5 h-5 text-primary" /> Admin Quick Actions & Getting Started
        </h2>
        <p className="text-xs text-muted-foreground mb-4">
          Quickly perform key administrative operations across the Scholaria platform.
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          <Link
            to="/admin/teachers"
            className="p-4 rounded-md border border-border hover:border-gold hover:bg-muted/30 transition-all group"
          >
            <div className="font-semibold text-sm text-primary flex items-center justify-between">
              <span>Authorize Teacher Email</span>
              <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Add email addresses to the approved teacher list to grant teacher access.
            </p>
          </Link>

          <Link
            to="/admin/courses"
            className="p-4 rounded-md border border-border hover:border-gold hover:bg-muted/30 transition-all group"
          >
            <div className="font-semibold text-sm text-primary flex items-center justify-between">
              <span>Create Course & Assign Teacher</span>
              <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Setup a new course subject, section, and assign an authorized teacher.
            </p>
          </Link>

          <Link
            to="/admin/reports"
            className="p-4 rounded-md border border-border hover:border-gold hover:bg-muted/30 transition-all group"
          >
            <div className="font-semibold text-sm text-primary flex items-center justify-between">
              <span>View Institute Reports</span>
              <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Inspect overall attendance percentages and average task grades.
            </p>
          </Link>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 shadow-xs">
        <h2 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
          <Megaphone className="w-5 h-5 text-gold" /> Recent Institute Announcements
        </h2>
        <div className="space-y-3 text-sm">
          {announcementList.map((a) => (
            <div key={a.id} className="border-l-4 border-gold pl-4 py-1.5 bg-muted/20 rounded-r-md">
              <div className="font-semibold text-foreground">{a.title}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{a.body}</div>
              <div className="text-[11px] text-gold font-medium mt-1">
                Author: {a.author} · Scope: {a.scope} · {a.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

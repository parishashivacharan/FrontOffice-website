import { Link, useRouter, useLocation } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { getCurrentUser, logout, type Role, type User } from "@/lib/mock-auth";
import {
  Bell,
  GraduationCap,
  LogOut,
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  Upload,
  Users,
  BarChart3,
  UserCog,
  Megaphone,
  CalendarCheck,
  User as UserIcon,
  PanelLeftClose,
  PanelLeftOpen,
  Globe,
  Inbox,
} from "lucide-react";
import { cn } from "@/lib/utils";
import MacOSDock from "./ui/mac-os-dock";

type NavItem = { to: string; label: string; icon: React.ComponentType<{ className?: string }> };

const NAV: Record<Role, NavItem[]> = {
  student: [
    { to: "/student", label: "Dashboard", icon: LayoutDashboard },
    { to: "/student/courses", label: "Universes", icon: Globe },
    { to: "/student/tasks", label: "Tasks", icon: ClipboardList },
    { to: "/student/resources", label: "Resources", icon: Upload },
    { to: "/student/attendance", label: "Attendance", icon: CalendarCheck },
    { to: "/notifications", label: "Announcements", icon: Megaphone },
    { to: "/student/profile", label: "Profile", icon: UserIcon },
  ],
  teacher: [
    { to: "/teacher", label: "Dashboard", icon: LayoutDashboard },
    { to: "/teacher/courses", label: "Universes", icon: Globe },
    { to: "/teacher/tasks/new", label: "Tasks", icon: ClipboardList },
    { to: "/teacher/submissions", label: "Submissions", icon: Inbox },
    { to: "/teacher/resources/new", label: "Resources", icon: Upload },
    { to: "/teacher/attendance", label: "Attendance", icon: CalendarCheck },
    { to: "/teacher/announcements/new", label: "Announcements", icon: Megaphone },
    { to: "/teacher/profile", label: "Profile", icon: UserIcon },
  ],
  admin: [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/courses", label: "Universes", icon: Globe },
    { to: "/admin/tasks", label: "Tasks", icon: ClipboardList },
    { to: "/admin/resources", label: "Resources", icon: Upload },
    { to: "/admin/attendance", label: "Attendance", icon: CalendarCheck },
    { to: "/admin/announcements", label: "Announcements", icon: Megaphone },
    { to: "/admin/teachers", label: "Teacher Emails", icon: UserCog },
    { to: "/admin/users", label: "Users", icon: Users },
    { to: "/admin/activity", label: "Activity Log", icon: BarChart3 },
    { to: "/admin/reports", label: "Reports", icon: BarChart3 },
    { to: "/admin/profile", label: "Profile", icon: UserIcon },
  ],
};

export function AppShell({ role, children }: { role: Role; children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotifPopover, setShowNotifPopover] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const router = useRouter();
  const location = useLocation();

  useEffect(() => {
    const sync = () => setUser(getCurrentUser());
    sync();
    window.addEventListener("scholaria:auth", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("scholaria:auth", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  useEffect(() => {
    const u = getCurrentUser();
    if (!u) {
      router.navigate({ to: "/login" });
    } else if (u.role !== role) {
      if (u.email.toLowerCase() === "rajesh@ihm.edu" && (role === "admin" || role === "teacher")) {
        // Mr. Rajesh has access to both teacher and admin portals
      } else {
        router.navigate({
          to: u.role === "admin" ? "/admin" : u.role === "teacher" ? "/teacher" : "/student",
        });
      }
    }
  }, [role, router]);

  // Role-specific display user (ensures each portal displays its dedicated account)
  const displayUser = (() => {
    if (role === "teacher") {
      return {
        name: user?.email.toLowerCase() === "rajesh@ihm.edu" ? user.name || "Mr. Rajesh" : "Mr. Rajesh",
        email: "rajesh@ihm.edu",
        role: "teacher" as Role,
      };
    }
    if (role === "student") {
      if (user && user.role === "student") {
        return user;
      }
      return {
        name: "Test Student",
        email: "123456789@ihm.edu",
        role: "student" as Role,
      };
    }
    return {
      name: "Institute Admin",
      email: "parishashivacharan@gmail.com",
      role: "admin" as Role,
    };
  })();

  const items = NAV[role];

  // Helper for clean breadcrumb section title without role redundancy
  const rawPath = location.pathname.split("/").filter(Boolean).slice(-1)[0] ?? "dashboard";
  const pageTitle =
    rawPath === "student" || rawPath === "teacher" || rawPath === "admin"
      ? "Dashboard"
      : rawPath.replace(/-/g, " ");

  const profilePath = `/${role}/profile`;

  const activeApp =
    items.find(
      (item) =>
        location.pathname === item.to ||
        (item.to !== "/" + role && location.pathname.startsWith(item.to)),
    ) || items[0];

  return (
    <div className="min-h-screen bg-[#fffaf0] font-sans flex flex-col md:flex-row relative">
      {/* ── Desktop & Tablet Sidebar (Hidden on Mobile Phones, Desktop w-64 / w-16 icon rail) ── */}
      <aside
        className={cn(
          "hidden md:flex shrink-0 bg-[#fffaf0] border-r border-[#e5e5e5] flex-col justify-between h-screen sticky top-0 z-20 transition-all duration-300 ease-in-out select-none",
          sidebarOpen ? "w-64" : "w-16",
        )}
      >
        {/* Top: Logo & Branding / Navigation */}
        <div className="flex flex-col h-full justify-between">
          <div>
            {/* Header: Logo + Collapse/Expand Toggle beside logo */}
            <div
              className={cn(
                "p-4 border-b border-[#e5e5e5]/60 flex items-center h-16",
                sidebarOpen ? "justify-between" : "justify-center",
              )}
            >
              {sidebarOpen ? (
                <>
                  <Link to="/" className="flex items-center gap-2.5 overflow-hidden">
                    <div className="p-1.5 rounded-lg bg-[#0a0a0a] text-white shrink-0">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-base font-medium tracking-tight text-[#0a0a0a] leading-none truncate">
                        Scholaria
                      </div>
                      <div className="text-[9px] uppercase tracking-[0.18em] text-[#e8b94a] font-semibold mt-0.5">
                        {role === "admin"
                          ? "Admin Portal"
                          : role === "teacher"
                            ? "Teacher Portal"
                            : "Student Portal"}
                      </div>
                    </div>
                  </Link>
                  {/* Collapse Button beside logo name */}
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-1.5 rounded-lg text-[#6a6a6a] hover:text-[#0a0a0a] hover:bg-[#0a0a0a]/5 transition-colors shrink-0"
                    title="Collapse sidebar"
                  >
                    <PanelLeftClose className="w-4 h-4" />
                  </button>
                </>
              ) : (
                /* Expand Button centered in icon rail when collapsed */
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 rounded-lg bg-[#0a0a0a] text-white hover:bg-[#1a1a1a] transition-colors"
                  title="Expand sidebar"
                >
                  <PanelLeftOpen className="w-4.5 h-4.5" />
                </button>
              )}
            </div>

            {/* Navigation Items (Icon rail when collapsed, full label when expanded) */}
            <nav className="p-2 space-y-1 mt-2">
              {sidebarOpen && (
                <div className="px-3 py-1 text-[10px] uppercase tracking-[0.15em] font-semibold text-[#9a9a9a]">
                  Navigation
                </div>
              )}
              {items.map((item) => {
                const active =
                  location.pathname === item.to ||
                  (item.to !== "/" + role &&
                    location.pathname !== "/notifications" &&
                    location.pathname.startsWith(item.to));
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    title={item.label}
                    className={cn(
                      "flex items-center gap-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150",
                      sidebarOpen ? "px-3" : "justify-center px-0 w-12 mx-auto",
                      active
                        ? "bg-[#0a0a0a]/8 text-[#0a0a0a] font-semibold"
                        : "text-[#6a6a6a] hover:bg-[#0a0a0a]/4 hover:text-[#0a0a0a]",
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4 shrink-0 transition-colors",
                        active ? "text-[#0a0a0a]" : "text-[#6a6a6a]",
                      )}
                    />
                    {sidebarOpen && <span className="truncate">{item.label}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom User Section */}
          <div className="p-2.5 border-t border-[#e5e5e5]/60 bg-[#faf5e8]/50">
            {sidebarOpen ? (
              <>
                <Link
                  to={profilePath}
                  className="flex items-center gap-3 px-2 py-2 mb-2 rounded-lg hover:bg-white/60 transition-colors"
                >
                  <div className="h-8 w-8 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center font-medium text-xs shrink-0">
                    {displayUser.name[0]?.toUpperCase() ?? "U"}
                  </div>
                  <div className="overflow-hidden flex-1">
                    <div className="text-xs font-semibold truncate leading-snug text-[#0a0a0a]">
                      {displayUser.name}
                    </div>
                    <div className="text-[11px] text-[#6a6a6a] truncate">{displayUser.email}</div>
                    <div className="mt-1">
                      <span
                        className={cn(
                          "text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border inline-block",
                          role === "admin"
                            ? "bg-[#e8b94a]/20 text-[#0a0a0a] border-[#e8b94a]/40"
                            : role === "teacher"
                              ? "bg-[#b8a4ed]/25 text-[#0a0a0a] border-[#b8a4ed]/40"
                              : "bg-[#22c55e]/15 text-[#22c55e] border-[#22c55e]/30",
                        )}
                      >
                        {role === "admin" ? "👑 Admin" : role === "teacher" ? "👩‍🏫 Teacher" : "🎓 Student"}
                      </span>
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    router.navigate({ to: "/login" });
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-lg border border-[#e5e5e5] bg-white/60 hover:bg-[#ef4444] hover:text-white hover:border-[#ef4444] text-[#3a3a3a] text-xs py-2 transition-all font-medium shadow-xs"
                >
                  <LogOut className="h-3.5 w-3.5" /> Sign out
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2 py-1">
                <Link
                  to={profilePath}
                  className="h-8 w-8 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center font-medium text-xs shadow-xs hover:opacity-80 transition-opacity"
                  title={displayUser.name || "Profile"}
                >
                  {displayUser.name[0]?.toUpperCase() ?? "U"}
                </Link>
                <button
                  onClick={() => {
                    logout();
                    router.navigate({ to: "/login" });
                  }}
                  className="p-2 rounded-lg text-[#6a6a6a] hover:text-[#ef4444] hover:bg-white/80 transition-colors"
                  title="Sign out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <main className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Header — Minimal Pro Navbar Pill */}
        <header className="sticky top-0 z-30 px-3 sm:px-6 py-2.5 sm:py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/40 backdrop-blur-md border border-[#0a0a0a]/10 rounded-full px-4 sm:px-5 h-12 sm:h-14 shadow-xs">
            {/* Left: Minimal Pro Breadcrumb with Yellow Scholaria text */}
            <div className="flex items-center gap-2 overflow-hidden">
              <Link to="/" className="flex items-center gap-1.5 shrink-0 md:hidden">
                <div className="p-1 rounded bg-[#0a0a0a] text-white">
                  <GraduationCap className="h-3.5 w-3.5" />
                </div>
              </Link>
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm overflow-hidden">
                <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-[#e8b94a] uppercase bg-[#e8b94a]/10 px-2 sm:px-2.5 py-0.5 rounded-full border border-[#e8b94a]/20 shrink-0">
                  Scholaria
                </span>
                <span className="text-[#9a9a9a] font-light">/</span>
                <span className="font-medium text-[#0a0a0a] capitalize truncate">{pageTitle}</span>
              </div>
            </div>

            {/* Right: Notifications & Minimal Profile Pill Trigger */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0 relative">
              <button
                onClick={() => {
                  setShowNotifPopover(!showNotifPopover);
                  setUnreadCount(0);
                }}
                className="p-1.5 sm:p-2 rounded-full hover:bg-white/50 transition-colors relative text-[#6a6a6a] hover:text-[#0a0a0a]"
                title="Notifications"
              >
                <Bell className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 sm:top-1.5 right-1 sm:right-1.5 w-2 h-2 bg-[#ff4d8b] rounded-full ring-2 ring-white" />
                )}
              </button>

              {/* Working Notifications Dropdown Popover */}
              {showNotifPopover && (
                <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white border border-[#e5e5e5] rounded-2xl shadow-xl z-50 p-4 text-left font-sans animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between pb-3 border-b border-[#e5e5e5]">
                    <div className="font-semibold text-xs text-[#0a0a0a] uppercase tracking-wider">
                      Recent Notifications
                    </div>
                    <button
                      onClick={() => setShowNotifPopover(false)}
                      className="text-[11px] text-[#6a6a6a] hover:text-[#0a0a0a]"
                    >
                      Close
                    </button>
                  </div>
                  <div className="space-y-3 py-3 max-h-80 overflow-y-auto">
                    <div className="p-2.5 rounded-xl bg-[#fffaf0] border border-[#e8b94a]/20 flex items-start gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-[#e8b94a] mt-1.5 shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-[#0a0a0a]">
                          Teacher Email Authorized
                        </div>
                        <div className="text-[11px] text-[#6a6a6a]">
                          priya.sharma@school.edu approved by Institute Admin.
                        </div>
                        <div className="text-[9px] text-[#9a9a9a] mt-1">10 minutes ago</div>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#faf5e8]/50 border border-[#e5e5e5] flex items-start gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-[#1a3a3a] mt-1.5 shrink-0" />
                      <div>
                        <div className="text-xs font-medium text-[#0a0a0a]">
                          New Task Assignment
                        </div>
                        <div className="text-[11px] text-[#6a6a6a]">
                          Quadratic Equations Worksheet added to Mathematics.
                        </div>
                        <div className="text-[9px] text-[#9a9a9a] mt-1">1 hour ago</div>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#faf5e8]/50 border border-[#e5e5e5] flex items-start gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-[#b8a4ed] mt-1.5 shrink-0" />
                      <div>
                        <div className="text-xs font-medium text-[#0a0a0a]">
                          Campus Announcement
                        </div>
                        <div className="text-[11px] text-[#6a6a6a]">
                          Mid-term exams begin August 12. Timetable released.
                        </div>
                        <div className="text-[9px] text-[#9a9a9a] mt-1">Yesterday</div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-[#e5e5e5] text-center">
                    <Link
                      to="/notifications"
                      onClick={() => setShowNotifPopover(false)}
                      className="text-xs font-medium text-[#0a0a0a] hover:underline"
                    >
                      View all announcements →
                    </Link>
                  </div>
                </div>
              )}

              <Link
                to={profilePath}
                className="flex items-center gap-2 border-l border-[#e5e5e5] pl-2 sm:pl-3 py-1 hover:opacity-85 transition-opacity"
                title={`View Profile (${role.toUpperCase()})`}
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center text-[10px] sm:text-xs font-semibold">
                  {user?.name?.[0]?.toUpperCase() ?? "P"}
                </div>
                <span className="text-xs font-semibold text-[#0a0a0a] hidden sm:inline">
                  {user?.name || role}
                </span>
                <span
                  className={cn(
                    "text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border inline-flex items-center gap-1",
                    role === "admin"
                      ? "bg-[#e8b94a]/20 text-[#0a0a0a] border-[#e8b94a]/40"
                      : role === "teacher"
                        ? "bg-[#b8a4ed]/25 text-[#0a0a0a] border-[#b8a4ed]/40"
                        : "bg-[#22c55e]/15 text-[#22c55e] border-[#22c55e]/30",
                  )}
                >
                  {role === "admin" ? "👑 Admin" : role === "teacher" ? "👩‍🏫 Teacher" : "🎓 Student"}
                </span>
              </Link>
            </div>
          </div>
        </header>

        {/* Inner Page View with bottom padding for mobile dock */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full pb-28 md:pb-8">
          {children}
        </div>
      </main>

      {/* ── Mobile Floating MacOS Dock Navigation (Phone screens only, < 768px) ── */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 md:hidden pointer-events-auto max-w-[95vw]">
        <MacOSDock
          apps={items.map((item) => ({
            id: item.to,
            name: item.label,
            icon: item.icon,
            to: item.to,
          }))}
          activeAppId={activeApp.to}
          onAppClick={(to) => {
            router.navigate({ to });
          }}
        />
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6 sm:mb-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-medium tracking-[-0.03em] text-[#0a0a0a]">
          {title}
        </h1>
        {subtitle && <p className="text-xs sm:text-sm text-[#6a6a6a] mt-1 sm:mt-1.5">{subtitle}</p>}
        <div className="gold-divider w-20 sm:w-24 mt-2 sm:mt-3" />
      </div>
      {action && <div className="w-full sm:w-auto flex justify-start sm:justify-end">{action}</div>}
    </div>
  );
}

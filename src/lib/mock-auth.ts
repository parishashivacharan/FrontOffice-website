// Mock auth using localStorage for Scholaria Platform
import { logActivity } from "./mock-data";

export type Role = "student" | "teacher" | "admin";

export type User = {
  id: string;
  email: string;
  name: string;
  role: Role;
  className?: string;
  section?: string;
  rollNumber?: string;
  phone?: string;
  department?: string;
  createdAt?: string;
  lastActive?: string;
};

export type ApprovedTeacherRecord = {
  email: string;
  approvedAt: string;
};

const USER_KEY = "scholaria:user";
const USERS_LIST_KEY = "scholaria:all-users";
const APPROVED_KEY = "scholaria:approved-teachers";
export const ADMIN_EMAIL = "parishashivacharan@gmail.com";

const DEFAULT_APPROVED: string[] = ["rajesh@ihm.edu"];

export function getApprovedTeachers(): string[] {
  if (typeof window === "undefined") return DEFAULT_APPROVED;
  const raw = localStorage.getItem(APPROVED_KEY);
  if (!raw) {
    localStorage.setItem(APPROVED_KEY, JSON.stringify(DEFAULT_APPROVED));
    return DEFAULT_APPROVED;
  }
  try {
    const parsed = JSON.parse(raw);
    if (
      Array.isArray(parsed) &&
      parsed.some(
        (e: string) =>
          e.includes("school.edu") || e.includes("campus.edu") || e.includes("priya"),
      )
    ) {
      localStorage.setItem(APPROVED_KEY, JSON.stringify(DEFAULT_APPROVED));
      return DEFAULT_APPROVED;
    }
    return parsed;
  } catch {
    return DEFAULT_APPROVED;
  }
}

const DEFAULT_USERS: User[] = [
  {
    id: "admin-1",
    email: ADMIN_EMAIL,
    name: "Institute Admin",
    role: "admin",
    createdAt: "2026-07-25",
    lastActive: "Active now",
  },
  {
    id: "t-rajesh",
    email: "rajesh@ihm.edu",
    name: "Mr. Rajesh",
    role: "teacher",
    department: "Department of Front Office (Room Division Operations)",
    createdAt: "2026-07-25",
    lastActive: "Active now",
  },
  {
    id: "s-demo",
    email: "123456789@ihm.edu",
    name: "Test Student (Verification Account)",
    role: "student",
    rollNumber: "123456789",
    className: "Second Year B.Sc. in H & HA",
    section: "Semester 3",
    createdAt: "2026-07-25",
    lastActive: "Active now",
  },
];

export function saveApprovedTeachers(list: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(APPROVED_KEY, JSON.stringify(list));
}

export function addApprovedTeacher(email: string): { ok: boolean; message: string } {
  const cleanEmail = email.trim().toLowerCase();
  if (!cleanEmail) return { ok: false, message: "Email cannot be empty" };

  const current = getApprovedTeachers();
  if (current.map((e) => e.toLowerCase()).includes(cleanEmail)) {
    return { ok: false, message: "Email is already on the approved teacher list" };
  }

  const updated = [...current, cleanEmail];
  saveApprovedTeachers(updated);

  // Log activity
  logActivity("Approved Teacher Email", cleanEmail, "parishashivacharan@gmail.com", "Teacher Approval");

  // Upgrade existing student user if account already exists
  const users = getAllUsers();
  const existingUserIndex = users.findIndex((u) => u.email.toLowerCase() === cleanEmail);
  if (existingUserIndex !== -1 && users[existingUserIndex].role !== "admin") {
    users[existingUserIndex].role = "teacher";
    saveAllUsers(users);

    const currentUser = getCurrentUser();
    if (currentUser && currentUser.email.toLowerCase() === cleanEmail) {
      setCurrentUser(users[existingUserIndex]);
    }
  }

  return { ok: true, message: `Approved teacher email added: ${cleanEmail}` };
}

export function removeApprovedTeacher(email: string) {
  const cleanEmail = email.trim().toLowerCase();
  const current = getApprovedTeachers();
  const updated = current.filter((e) => e.toLowerCase() !== cleanEmail);
  saveApprovedTeachers(updated);
  logActivity("Revoked Teacher Approval", cleanEmail, "parishashivacharan@gmail.com", "Teacher Approval");
}

export function deleteUser(userId: string) {
  const users = getAllUsers();
  const target = users.find((u) => u.id === userId);
  if (!target) return;
  const updated = users.filter((u) => u.id !== userId);
  saveAllUsers(updated);
  logActivity("Removed User Account", `${target.name} (${target.email})`, "parishashivacharan@gmail.com", "User Management");
}

export function getAllUsers(): User[] {
  if (typeof window === "undefined") return DEFAULT_USERS;
  const raw = localStorage.getItem(USERS_LIST_KEY);
  if (!raw) {
    localStorage.setItem(USERS_LIST_KEY, JSON.stringify(DEFAULT_USERS));
    return DEFAULT_USERS;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return DEFAULT_USERS;
  }
}

export function saveAllUsers(users: User[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(USERS_LIST_KEY, JSON.stringify(users));
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setCurrentUser(u: User | null) {
  if (typeof window === "undefined") return;
  if (u) {
    localStorage.setItem(USER_KEY, JSON.stringify(u));
  } else {
    localStorage.removeItem(USER_KEY);
  }
  window.dispatchEvent(new Event("scholaria:auth"));
}

export function updateUser(partial: Partial<User>): User | null {
  const current = getCurrentUser();
  if (!current) return null;
  const updated: User = { ...current, ...partial };
  setCurrentUser(updated);

  const allUsers = getAllUsers();
  const index = allUsers.findIndex(
    (u) => u.id === updated.id || u.email.toLowerCase() === updated.email.toLowerCase(),
  );
  if (index !== -1) {
    allUsers[index] = updated;
    saveAllUsers(allUsers);
  }
  return updated;
}

export function isApprovedTeacher(email: string): boolean {
  const cleanEmail = email.trim().toLowerCase();
  if (
    cleanEmail === "rajesh@ihm.edu" ||
    cleanEmail === "teacher@campus.edu" ||
    cleanEmail.includes("rajesh")
  ) {
    return true;
  }
  return getApprovedTeachers()
    .map((e) => e.toLowerCase())
    .includes(cleanEmail);
}

export function isAdminEmail(email: string): boolean {
  const cleanEmail = email.trim().toLowerCase();
  return (
    cleanEmail === ADMIN_EMAIL.toLowerCase() ||
    cleanEmail === "admin@campus.edu" ||
    cleanEmail === "admin@school.edu" ||
    cleanEmail.startsWith("admin@")
  );
}

export function determineRole(email: string): Role {
  if (isAdminEmail(email)) return "admin";
  if (isApprovedTeacher(email)) return "teacher";
  return "student";
}

export function register(opts: {
  name: string;
  email: string;
  password?: string;
}): { ok: true; user: User } | { ok: false; error: string } {
  const email = opts.email.trim().toLowerCase();
  const name = opts.name.trim();

  if (!email || !name) {
    return { ok: false, error: "Please enter your full name and email address." };
  }

  const users = getAllUsers();
  const existing = users.find((u) => u.email.toLowerCase() === email);
  if (existing) {
    return {
      ok: false,
      error: "An account with this email address already exists. Please log in.",
    };
  }

  const role = determineRole(email);

  const newUser: User = {
    id: crypto.randomUUID(),
    email,
    name,
    role,
    createdAt: new Date().toISOString().split("T")[0],
  };

  users.push(newUser);
  saveAllUsers(users);
  setCurrentUser(newUser);

  return { ok: true, user: newUser };
}

export function login(email: string): { ok: true; user: User } | { ok: false; error: string } {
  const cleanEmail = email.trim().toLowerCase();
  if (!cleanEmail) return { ok: false, error: "Please enter your email address." };

  const targetRole = determineRole(cleanEmail);
  const users = getAllUsers();

  let user = users.find((u) => u.email.toLowerCase() === cleanEmail);

  if (user) {
    user.role = targetRole;
    saveAllUsers(users);
  } else {
    user = {
      id: crypto.randomUUID(),
      email: cleanEmail,
      name: cleanEmail.includes("rajesh") ? "Mr. Rajesh (Faculty)" : cleanEmail.split("@")[0].replace(".", " "),
      role: targetRole,
      createdAt: new Date().toISOString().split("T")[0],
    };
    users.push(user);
    saveAllUsers(users);
  }

  setCurrentUser(user);
  return { ok: true, user };
}

export function logout() {
  setCurrentUser(null);
}

export const dashboardPath: Record<Role, string> = {
  student: "/student",
  teacher: "/teacher",
  admin: "/admin",
};

export function isStudentProfileComplete(user: User | null): boolean {
  if (!user) return false;
  if (user.role !== "student") return true;
  if (user.rollNumber && user.rollNumber.trim().length >= 6) return true;
  const emailRoll = user.email.split("@")[0];
  if (emailRoll && /^\d{6,}$/.test(emailRoll)) return true;
  return Boolean(user.rollNumber && user.name && user.name !== "Student");
}

// Dynamic mock data store for Scholaria Platform

export type Course = {
  id: string;
  name: string;
  grade: string;
  teacher: string;
  teacherId?: string;
  students: number;
  syllabus: string;
  code?: string;
  schedule?: string;
  description?: string;
  studentCount?: number;
  room?: string;
};

export type Task = {
  id: string;
  courseId: string;
  title: string;
  due: string;
  marks: number;
  description: string;
  status: "pending" | "submitted" | "graded";
  grade?: number;
  feedback?: string;
  submissionText?: string;
  submissionFile?: string;
  submittedAt?: string;
  teacherId?: string;
};

export type Submission = {
  id: string;
  taskId: string;
  studentId: string;
  studentName: string;
  studentRoll: string;
  submissionText?: string;
  submissionFile?: string;
  submittedAt: string;
  status: "submitted" | "graded";
  marksObtained?: number;
  feedback?: string;
};

export type Resource = {
  id: string;
  courseId: string;
  title: string;
  type: string;
  uploaded: string;
  url?: string;
  description?: string;
  unit?: number;
  unitTitle?: string;
  subtitle?: string;
  author?: string;
  institution?: string;
  downloadFilename?: string;
  content?: string;
  keyTopics?: string[];
};

export type Announcement = {
  id: string;
  title: string;
  body: string;
  author: string;
  date: string;
  scope: string; // "Institute-wide" or courseId/courseName
};

export type StudentItem = {
  id: string;
  name: string;
  roll: string;
  email: string;
  attendance: number;
};

export type AttendanceRecord = {
  id: string;
  courseId: string;
  date: string;
  studentId: string;
  status: "Present" | "Absent" | "Late";
  teacherId?: string;
};

export type ActivityLog = {
  id: string;
  action: string;
  target: string;
  actor: string;
  timestamp: string;
  category: "Teacher Approval" | "Course Management" | "User Management" | "System Event";
};

const ACTIVITY_LOGS_KEY = "scholaria:activity-logs";

const initialActivityLogs: ActivityLog[] = [
  {
    id: "act-1",
    action: "Approved Faculty Authorization",
    target: "rajesh@ihm.edu (Department of Front Office)",
    actor: "parishashivacharan@gmail.com",
    timestamp: "2026-07-29 09:30 AM",
    category: "Teacher Approval",
  },
  {
    id: "act-2",
    action: "Published Study Material Handout",
    target: "Unit 1: Rate Setting & Forecasting (Hubbart Formula)",
    actor: "rajesh@ihm.edu",
    timestamp: "2026-07-29 10:15 AM",
    category: "Course Management",
  },
  {
    id: "act-3",
    action: "Verified Class Attendance Sheet",
    target: "IHM Batches A, B, C & D (Semester 3)",
    actor: "rajesh@ihm.edu",
    timestamp: "2026-07-29 11:45 AM",
    category: "User Management",
  },
  {
    id: "act-4",
    action: "Deployed Market Simulation Universes",
    target: "Round 9 Scorecards (Universes 1 to 4)",
    actor: "parishashivacharan@gmail.com",
    timestamp: "2026-07-29 02:20 PM",
    category: "Course Management",
  },
  {
    id: "act-5",
    action: "Verified 105-Student Roster & Accounts",
    target: "Semester 3 Roster (Incl. 2 Re-Admissions in Batch D)",
    actor: "parishashivacharan@gmail.com",
    timestamp: "2026-07-29 04:30 PM",
    category: "User Management",
  },
];

export function getActivityLogs(): ActivityLog[] {
  if (typeof window === "undefined") return initialActivityLogs;
  try {
    const raw = localStorage.getItem(ACTIVITY_LOGS_KEY);
    if (!raw) return initialActivityLogs;
    const parsed = JSON.parse(raw);
    if (
      Array.isArray(parsed) &&
      parsed.some(
        (a: any) =>
          a.target?.includes("priya.sharma") ||
          a.target?.includes("Mathematics") ||
          a.target?.includes("Computer Science") ||
          a.target?.includes("Grade 10"),
      )
    ) {
      localStorage.setItem(ACTIVITY_LOGS_KEY, JSON.stringify(initialActivityLogs));
      return initialActivityLogs;
    }
    return parsed;
  } catch {
    return initialActivityLogs;
  }
}

export function logActivity(
  action: string,
  target: string,
  actor: string = "parishashivacharan@gmail.com",
  category: ActivityLog["category"] = "System Event",
) {
  const current = getActivityLogs();
  const newLog: ActivityLog = {
    id: "act-" + Date.now(),
    action,
    target,
    actor,
    timestamp: new Date().toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    category,
  };
  const updated = [newLog, ...current];
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(ACTIVITY_LOGS_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event("scholaria:activity"));
    } catch (e) {
      console.error(e);
    }
  }
  return updated;
}

// Initial Seed Collections
export const initialCourses: Course[] = [
  {
    id: "universe-1",
    name: "Universe 1 - Market Benchmark",
    grade: "Round 9 Simulation",
    teacher: "Mr. Rajesh",
    teacherId: "t-rajesh",
    students: 11,
    studentCount: 11,
    code: "UNI-1",
    schedule: "Mon, Wed (10:00 AM)",
    description: "Celestia and Victory Hotels lead 11 competing hotels with top margins and operational efficiency.",
    room: "IHM FO Lab 1",
    syllabus: "Celestia, Victory, Brown, Marriott market benchmark analysis",
  },
  {
    id: "universe-2",
    name: "Universe 2 - Competitive Dynamics",
    grade: "Round 9 Simulation",
    teacher: "Mr. Rajesh",
    teacherId: "t-rajesh",
    students: 11,
    studentCount: 11,
    code: "UNI-2",
    schedule: "Tue, Thu (11:30 AM)",
    description: "Competitive price positioning, yield management strategies, and revenue index benchmark.",
    room: "IHM FO Lab 2",
    syllabus: "RevPAR optimization, Market Penetration Index, Revenue Generation Index",
  },
  {
    id: "universe-3",
    name: "Universe 3 - Yield Optimization",
    grade: "Round 9 Simulation",
    teacher: "Mr. Rajesh",
    teacherId: "t-rajesh",
    students: 11,
    studentCount: 11,
    code: "UNI-3",
    schedule: "Wed, Fri (02:00 PM)",
    description: "Cost per occupied room (CPOR), GOPPAR optimization, and occupancy yield management.",
    room: "IHM FO Lab 3",
    syllabus: "CPOR, GOPPAR, Occupancy %, Staffing ratio optimization",
  },
  {
    id: "universe-4",
    name: "Universe 4 - Strategic Positioning",
    grade: "Round 9 Simulation",
    teacher: "Mr. Rajesh",
    teacherId: "t-rajesh",
    students: 11,
    studentCount: 11,
    code: "UNI-4",
    schedule: "Fri (03:30 PM)",
    description: "Long-term cumulative earnings, guest satisfaction drivers, and market share positioning.",
    room: "IHM FO Lab 4",
    syllabus: "Cumulative Earnings, Guest Satisfaction, ARI, RGI",
  },
  {
    id: "room-division",
    name: "Room Division - Front Office Operations",
    grade: "Semester 3 · B.Sc. H & HA",
    teacher: "Mr. Rajesh",
    teacherId: "t-rajesh",
    students: 105,
    studentCount: 105,
    code: "RD-FOM-2026",
    schedule: "Mon, Tue, Thu (10:00 AM)",
    description: "Front Office Operations, Rate Management, Budgeting, CPOR Analysis, Guest Loyalty, and AI in Hospitality for IHM Hyderabad.",
    room: "IHM FO Main Lab",
    syllabus: "Unit 1: Rate Setting & Forecasting, Unit 2: Budgeting & CPOR, Unit 3: Performance Reports & STR, Unit 5: Guest Loyalty & AI",
  },
];

export const initialTasks: Task[] = [
  {
    id: "t-rd-1",
    courseId: "room-division",
    title: "Unit 1: Hubbart Formula Rate Setting Calculation",
    due: "2026-08-05",
    marks: 30,
    description: "Calculate the target Average Daily Rate (ADR) for a 300-room hotel using the 8-step Hubbart Formula, factoring in 12% target ROI, operating expenses, and non-room revenues.",
    status: "pending",
  },
  {
    id: "t-rd-2",
    courseId: "room-division",
    title: "Unit 2: Cost Per Occupied Room (CPOR) & Housekeeping Budget Sheet",
    due: "2026-08-10",
    marks: 25,
    description: "Submit CPOR variable expense breakdown for linen replacement, cleaning supplies, and guest amenities based on expected room occupancy.",
    status: "pending",
  },
  {
    id: "t-rd-3",
    courseId: "room-division",
    title: "Unit 3: Daily Operations Report (DOR) & RevPAR Analysis",
    due: "2026-08-15",
    marks: 40,
    description: "Analyze a 24-hour Daily Operations Report (DOR) revenue summary and calculate Occupancy %, ADR, RevPAR, and Yield Statistics.",
    status: "submitted",
    submissionText: "Submitted DOR revenue analysis sheet with calculated RevPAR (€85) and 81% occupancy index.",
  },
  {
    id: "t-rd-4",
    courseId: "room-division",
    title: "Unit 5: Guest Loyalty & Accor Membership Tier Case Study",
    due: "2026-08-20",
    marks: 35,
    description: "Evaluate the Wheel of Loyalty model and design 10 practical strategies for reducing customer defection in the front office department.",
    status: "graded",
    grade: 32,
    feedback: "Excellent analysis of Accor status tiers (Classic, Silver, Gold, Platinum, Diamond) and churn diagnostic strategies!",
  },
];

import { INITIAL_IHM_RESOURCES } from "@/lib/ihm-resources-data";

export const initialResources: Resource[] = INITIAL_IHM_RESOURCES.map((res) => ({
  id: res.id,
  unit: res.unit,
  unitTitle: res.unitTitle,
  subtitle: res.subtitle,
  courseId: "room-division",
  title: res.title,
  type: res.type,
  uploaded: res.uploaded,
  author: res.author,
  institution: res.institution,
  description: res.description,
  downloadFilename: res.downloadFilename,
  keyTopics: res.keyTopics,
  content: JSON.stringify(res.sections),
}));

export const initialAnnouncements: Announcement[] = [
  {
    id: "a-rd-1",
    title: "IHM Hyderabad: Room Division Mid-Term Practical & DOR Ratios Exam",
    body: "The mid-term practical evaluation for Second Year B.Sc. Semester 3 will take place in the Front Office Lab next Tuesday. Please review Units 1, 2, and 3 handouts.",
    author: "Mr. Rajesh",
    date: "1 hour ago",
    scope: "Institute-wide",
  },
  {
    id: "a-rd-2",
    title: "Unit 2 CPOR & Housekeeping Budget Submission Open",
    body: "Please submit your CPOR analysis sheets before the due date. Formula guides and sample calculation tables are available in the Resources tab.",
    author: "Mr. Rajesh",
    date: "3 hours ago",
    scope: "Room Division - Front Office Operations",
  },
  {
    id: "a-rd-3",
    title: "Special Guest Lecture: Artificial Intelligence in Front Office Operations",
    body: "Join us for a session on smart room technologies, self-service check-in kiosks, and AI-driven guest personalization across the 4 simulation universes.",
    author: "Mr. Rajesh",
    date: "Yesterday",
    scope: "Room Division - Front Office Operations",
  },
];

export const students: StudentItem[] = [
  { id: "s1", name: "Aarav Patel", roll: "10A-01", email: "aarav@student.edu", attendance: 92 },
  { id: "s2", name: "Diya Singh", roll: "10A-02", email: "diya@student.edu", attendance: 88 },
  { id: "s3", name: "Ishaan Kumar", roll: "10A-03", email: "ishaan@student.edu", attendance: 95 },
  { id: "s4", name: "Kavya Reddy", roll: "10A-04", email: "kavya@student.edu", attendance: 78 },
  { id: "s5", name: "Vihaan Joshi", roll: "10A-05", email: "vihaan@student.edu", attendance: 84 },
  { id: "s6", name: "Ananya Iyer", roll: "10A-06", email: "ananya@student.edu", attendance: 91 },
];

export const attendanceHistory = [
  { date: "2026-07-24", status: "Present" as const },
  { date: "2026-07-23", status: "Present" as const },
  { date: "2026-07-22", status: "Late" as const },
  { date: "2026-07-21", status: "Present" as const },
  { date: "2026-07-20", status: "Absent" as const },
  { date: "2026-07-19", status: "Present" as const },
  { date: "2026-07-18", status: "Present" as const },
];

export const notifications = [
  {
    id: "n1",
    title: "New task posted",
    body: "Unit 1: Hubbart Formula Rate Setting Calculation — due Aug 5",
    time: "10m ago",
    read: false,
  },
  {
    id: "n2",
    title: "Assignment graded",
    body: "Unit 5: Guest Loyalty & Accor Membership Tier Case Study — 32/35",
    time: "2h ago",
    read: false,
  },
  {
    id: "n3",
    title: "Announcement",
    body: "IHM Hyderabad: Room Division Mid-Term Practical Exam",
    time: "1h ago",
    read: true,
  },
];

export const messages = [
  {
    id: "m1",
    from: "Mr. Rajesh",
    course: "Room Division - Front Office Operations",
    body: "Please submit your CPOR analysis sheet before Tuesday.",
    time: "9:12 AM",
  },
  {
    id: "m2",
    from: "Student Candidate",
    course: "Room Division - Front Office Operations",
    body: "Sir, could you review the Unit 1 Hubbart Formula sample table?",
    time: "10:03 AM",
  },
  {
    id: "m3",
    from: "Mr. Rajesh",
    course: "Room Division - Front Office Operations",
    body: "Lab practical session scheduled in FO Lab 1.",
    time: "Yesterday",
  },
];

export const calendarEvents = [
  { date: "2026-08-05", title: "Unit 1 Hubbart Formula Rate Setting due", type: "task" as const },
  { date: "2026-08-10", title: "Unit 2 CPOR & Housekeeping Budget due", type: "task" as const },
  { date: "2026-08-15", title: "Unit 3 Daily Operations Report (DOR) due", type: "task" as const },
  { date: "2026-08-20", title: "Unit 5 Guest Loyalty & Accor Case Study due", type: "task" as const },
  { date: "2026-08-25", title: "Room Division Mid-Term Practical Exam", type: "event" as const },
];

// Helper Exports for backwards compatibility
export const courses = initialCourses;
export const tasks = initialTasks;
export const resources = initialResources;
export const announcements = initialAnnouncements;

// Persistent Helper Functions for React State & Mutability
function getItem<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  const raw = localStorage.getItem(`scholaria:data:${key}`);
  if (!raw) {
    localStorage.setItem(`scholaria:data:${key}`, JSON.stringify(fallback));
    return fallback;
  }
  try {
    const parsed = JSON.parse(raw);
    if (
      key === "courses" &&
      Array.isArray(parsed) &&
      parsed.some(
        (c: any) =>
          c.id === "math-10" ||
          c.id === "cs-10" ||
          c.id === "phy-10" ||
          c.id === "eng-10" ||
          (c.name && (c.name.includes("Mathematics") || c.name.includes("Computer Science"))),
      )
    ) {
      localStorage.setItem(`scholaria:data:${key}`, JSON.stringify(fallback));
      return fallback;
    }
    if (
      key === "resources" &&
      Array.isArray(parsed) &&
      parsed.some(
        (r: any) =>
          r.id === "r-1" ||
          r.id === "r-2" ||
          (r.title && (r.title.includes("Quadratic") || r.title.includes("Python") || r.title.includes("Optics"))),
      )
    ) {
      localStorage.setItem(`scholaria:data:${key}`, JSON.stringify(fallback));
      return fallback;
    }
    if (
      key === "tasks" &&
      Array.isArray(parsed) &&
      parsed.some((t: any) => t.id === "t1" || (t.title && t.title.includes("Quadratic")))
    ) {
      localStorage.setItem(`scholaria:data:${key}`, JSON.stringify(fallback));
      return fallback;
    }
    if (
      key === "announcements" &&
      Array.isArray(parsed) &&
      parsed.some((a: any) => a.id === "a1" || (a.title && a.title.includes("Math class")))
    ) {
      localStorage.setItem(`scholaria:data:${key}`, JSON.stringify(fallback));
      return fallback;
    }
    return parsed;
  } catch {
    return fallback;
  }
}

function setItem<T>(key: string, val: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(`scholaria:data:${key}`, JSON.stringify(val));
}

export function getCoursesStore(): Course[] {
  return getItem("courses", initialCourses);
}

export function addCourseStore(c: Omit<Course, "id" | "students">): Course {
  const list = getCoursesStore();
  const newCourse: Course = {
    ...c,
    id: `course-${Date.now()}`,
    students: 30,
  };
  list.push(newCourse);
  setItem("courses", list);
  logActivity("Created New Course", `${newCourse.name} (${newCourse.grade})`, "parishashivacharan@gmail.com", "Course Management");
  return newCourse;
}

export function deleteCourseStore(courseId: string) {
  const list = getCoursesStore();
  const target = list.find((c) => c.id === courseId);
  const updated = list.filter((c) => c.id !== courseId);
  setItem("courses", updated);
  if (target) {
    logActivity("Deleted Course", `${target.name} (${target.grade})`, "parishashivacharan@gmail.com", "Course Management");
  }
  return updated;
}

export function getTasksStore(): Task[] {
  return getItem("tasks", initialTasks);
}

export function addTaskStore(t: Omit<Task, "id" | "status">): Task {
  const list = getTasksStore();
  const newTask: Task = {
    ...t,
    id: `t-${Date.now()}`,
    status: "pending",
  };
  list.push(newTask);
  setItem("tasks", list);
  return newTask;
}

export function updateTaskSubmission(
  taskId: string,
  submissionText: string,
  fileName?: string,
): Task | null {
  const list = getTasksStore();
  const idx = list.findIndex((t) => t.id === taskId);
  if (idx === -1) return null;

  list[idx].status = "submitted";
  list[idx].submissionText = submissionText;
  if (fileName) list[idx].submissionFile = fileName;
  list[idx].submittedAt = new Date().toISOString().split("T")[0];

  setItem("tasks", list);
  return list[idx];
}

export function gradeTaskStore(taskId: string, grade: number, feedback: string): Task | null {
  const list = getTasksStore();
  const idx = list.findIndex((t) => t.id === taskId);
  if (idx === -1) return null;

  list[idx].status = "graded";
  list[idx].grade = grade;
  list[idx].feedback = feedback;

  setItem("tasks", list);
  return list[idx];
}

export function getResourcesStore(): Resource[] {
  return getItem("resources", initialResources);
}

export function addResourceStore(r: Omit<Resource, "id" | "uploaded">): Resource {
  const list = getResourcesStore();
  const newRes: Resource = {
    ...r,
    id: `r-${Date.now()}`,
    uploaded: "Just now",
  };
  list.push(newRes);
  setItem("resources", list);
  return newRes;
}

export function isCourseAssignedToTeacher(course: Course, userEmailOrName?: string | null): boolean {
  if (!userEmailOrName) return true;
  const clean = userEmailOrName.toLowerCase().trim();
  if (clean === "parishashivacharan@gmail.com" || clean.includes("admin")) return true;

  if (clean.includes("priya")) {
    return course.teacher.toLowerCase().includes("priya") || course.id === "math-10" || course.id === "eng-10";
  }
  if (clean.includes("rahul")) {
    return course.teacher.toLowerCase().includes("rahul") || course.id === "cs-10";
  }
  if (clean.includes("anita")) {
    return course.teacher.toLowerCase().includes("anita") || course.id === "phy-10";
  }
  return course.teacher.toLowerCase().includes(clean);
}

export function getTeacherAssignedCourses(userEmailOrName?: string | null): Course[] {
  const all = getCoursesStore();
  return all.filter((c) => isCourseAssignedToTeacher(c, userEmailOrName));
}

export function deleteTaskStore(taskId: string) {
  const list = getTasksStore();
  const updated = list.filter((t) => t.id !== taskId);
  setItem("tasks", updated);
  return updated;
}

export function updateTaskStore(taskId: string, partial: Partial<Task>) {
  const list = getTasksStore();
  const idx = list.findIndex((t) => t.id === taskId);
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...partial };
    setItem("tasks", list);
  }
  return list;
}

export function deleteResourceStore(resourceId: string) {
  const list = getResourcesStore();
  const updated = list.filter((r) => r.id !== resourceId);
  setItem("resources", updated);
  return updated;
}

export function updateResourceStore(resourceId: string, partial: Partial<Resource>) {
  const list = getResourcesStore();
  const idx = list.findIndex((r) => r.id === resourceId);
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...partial };
    setItem("resources", list);
  }
  return list;
}

export function getAnnouncementsStore(): Announcement[] {
  return getItem("announcements", initialAnnouncements);
}

export function deleteAnnouncementStore(annId: string) {
  const list = getAnnouncementsStore();
  const updated = list.filter((a) => a.id !== annId);
  setItem("announcements", updated);
  return updated;
}

export function updateAnnouncementStore(annId: string, partial: Partial<Announcement>) {
  const list = getAnnouncementsStore();
  const idx = list.findIndex((a) => a.id === annId);
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...partial };
    setItem("announcements", list);
  }
  return list;
}

export function addAnnouncementStore(a: Omit<Announcement, "id" | "date">): Announcement {
  const list = getAnnouncementsStore();
  const newAnn: Announcement = {
    ...a,
    id: `a-${Date.now()}`,
    date: "Just now",
  };
  list.unshift(newAnn);
  setItem("announcements", list);
  return newAnn;
}

export function getAttendanceStore(): AttendanceRecord[] {
  return getItem("attendance", []);
}

export function saveAttendanceStore(
  courseId: string,
  date: string,
  records: Array<{ studentId: string; status: "Present" | "Absent" | "Late" }>,
  teacherId?: string,
) {
  const existing = getAttendanceStore().filter(
    (r) => !(r.courseId === courseId && r.date === date),
  );
  const newRecords: AttendanceRecord[] = records.map((r) => ({
    id: `att-${Date.now()}-${r.studentId}`,
    courseId,
    date,
    studentId: r.studentId,
    status: r.status,
    teacherId,
  }));

  const updated = [...existing, ...newRecords];
  setItem("attendance", updated);
}

export function getStudentAttendanceSummary(studentId: string) {
  const records = getAttendanceStore().filter((r) => r.studentId === studentId);
  if (records.length === 0) {
    return { percentage: 92, history: attendanceHistory };
  }
  const total = records.length;
  const present = records.filter((r) => r.status === "Present" || r.status === "Late").length;
  const percentage = Math.round((present / total) * 100);
  const history = records.map((r) => ({ date: r.date, status: r.status }));
  return { percentage, history };
}

export type SubmissionRecord = {
  id: string;
  taskId: string;
  taskTitle: string;
  studentName: string;
  councilNo?: string;
  batch?: string;
  submittedAt: string;
  maxMarks: number;
  submissionText: string;
  status: "submitted" | "graded";
  grade?: string;
  feedback?: string;
};

export const initialSubmissions: SubmissionRecord[] = [
  {
    id: "sub-1",
    taskId: "t-1",
    taskTitle: "Optics Lab Report",
    studentName: "Aarav Patel",
    submittedAt: "2026-07-25",
    maxMarks: 30,
    submissionText: "Completed light ray refraction measurements in Lab Room 204.",
    status: "submitted",
  },
  {
    id: "sub-2",
    taskId: "t-2",
    taskTitle: "Python Algorithm Analysis",
    studentName: "Diya Singh",
    submittedAt: "2026-07-24",
    maxMarks: 50,
    submissionText: "Implemented quicksort and binary search with time complexity benchmarks.",
    status: "graded",
    grade: "48",
    feedback: "Excellent analysis and clean implementation!",
  },
];

export function getSubmissionsStore(): SubmissionRecord[] {
  return getItem("submissions", initialSubmissions);
}

export function gradeSubmission(id: string, grade: string, feedback: string) {
  const list = getSubmissionsStore();
  const idx = list.findIndex((s) => s.id === id);
  if (idx !== -1) {
    list[idx].status = "graded";
    list[idx].grade = grade;
    list[idx].feedback = feedback;
    setItem("submissions", list);
  }
}


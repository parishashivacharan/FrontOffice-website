# IHM Hyderabad — Front Office Operations & Simulation Portal
> **B.Sc. in Hospitality & Hotel Administration — Semester 3 (Second Year)**

Welcome to the **IHM Hyderabad Front Office Operations Portal**, a dedicated web application engineered for **Semester 3 B.Sc. H & HA** students, faculty members, and institute administrators. The platform seamlessly unifies real-time hotel revenue simulation, batch roster management, student task submissions, attendance tracking, and learning resource distribution.

---

## 🎨 System Architecture & Workflow (Xiaohei / 小黑 Illustrations)

Below are hand-drawn illustrations featuring **Xiaohei (小黑 / "Little Black")** — a solid black figure with white dot eyes acting out key workflows, hotel simulation analysis, and batch evaluation procedures across the portal.

### 1. Hotel Market Simulation & 4 Universes
Xiaohei monitoring real-time ADR, RevPAR, Yield Optimization, and Market Benchmark performance across the 4 simulation universes.

```xml
<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; border:1px solid #e5e5e5; border-radius:12px; width:100%; max-width:800px;">
  <!-- Grid Lines -->
  <line x1="100" y1="320" x2="720" y2="320" stroke="#e5e5e5" stroke-width="2" stroke-dasharray="6,6"/>
  <line x1="100" y1="240" x2="720" y2="240" stroke="#e5e5e5" stroke-width="2" stroke-dasharray="6,6"/>
  <line x1="100" y1="160" x2="720" y2="160" stroke="#e5e5e5" stroke-width="2" stroke-dasharray="6,6"/>

  <!-- Chart Axes -->
  <line x1="100" y1="80" x2="100" y2="350" stroke="#0a0a0a" stroke-width="3" stroke-linecap="round"/>
  <line x1="100" y1="350" x2="740" y2="350" stroke="#0a0a0a" stroke-width="3" stroke-linecap="round"/>

  <!-- Revenue Trend Curve -->
  <path d="M120,310 Q220,290 320,210 T520,170 T700,100" fill="none" stroke="#0a0a0a" stroke-width="4" stroke-linecap="round"/>

  <!-- Key Metrics Annotation -->
  <path d="M320,210 L370,140" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,4"/>
  <text x="380" y="135" font-family="monospace" font-size="14" font-weight="bold" fill="#ef4444">+34.8% RevPAR Surge (Round 9)</text>

  <path d="M520,170 L550,220" stroke="#2563eb" stroke-width="2" stroke-dasharray="4,4"/>
  <text x="560" y="230" font-family="monospace" font-size="14" font-weight="bold" fill="#2563eb">ADR: ₹8,450 / Night</text>

  <!-- Xiaohei (小黑) Figure -->
  <!-- Body -->
  <ellipse cx="260" cy="280" rx="22" ry="32" fill="#0a0a0a"/>
  <!-- Head -->
  <circle cx="260" cy="235" r="18" fill="#0a0a0a"/>
  <!-- Dot Eyes -->
  <circle cx="254" cy="232" r="2.5" fill="#ffffff"/>
  <circle cx="266" cy="232" r="2.5" fill="#ffffff"/>
  <!-- Thin Legs -->
  <line x1="250" y1="310" x2="245" y2="365" stroke="#0a0a0a" stroke-width="4" stroke-linecap="round"/>
  <line x1="270" y1="310" x2="275" y2="365" stroke="#0a0a0a" stroke-width="4" stroke-linecap="round"/>
  <!-- Arms pointing to graph -->
  <path d="M275,270 Q320,240 345,220" fill="none" stroke="#0a0a0a" stroke-width="4" stroke-linecap="round"/>
  <path d="M245,270 Q220,290 200,310" fill="none" stroke="#0a0a0a" stroke-width="4" stroke-linecap="round"/>

  <!-- Xiaohei Annotation -->
  <text x="210" y="395" font-family="sans-serif" font-size="13" font-weight="bold" fill="#0a0a0a">小黑 (Xiaohei): Monitoring Hotel Simulation Universes</text>
</svg>
```

---

### 2. Batch Roster Verification & Re-Admission Quota
Xiaohei verifying the 105 second-year student roster split into **Batch A, B, C, D**, including Re-Admission students (S.No 104, 105) placed in Batch D.

```xml
<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; border:1px solid #e5e5e5; border-radius:12px; width:100%; max-width:800px;">
  <!-- Clipboard Container -->
  <rect x="340" y="50" width="380" height="350" rx="16" fill="#fcfcfc" stroke="#0a0a0a" stroke-width="3"/>
  <rect x="470" y="35" width="120" height="24" rx="6" fill="#0a0a0a"/>

  <!-- Roster Lines -->
  <text x="370" y="95" font-family="monospace" font-size="14" font-weight="bold" fill="#0a0a0a">BATCH A (S.No 1 - 26): 26 Students</text>
  <line x1="370" y1="105" x2="690" y2="105" stroke="#e5e5e5" stroke-width="2"/>

  <text x="370" y="145" font-family="monospace" font-size="14" font-weight="bold" fill="#0a0a0a">BATCH B (S.No 27 - 52): 26 Students</text>
  <line x1="370" y1="155" x2="690" y2="155" stroke="#e5e5e5" stroke-width="2"/>

  <text x="370" y="195" font-family="monospace" font-size="14" font-weight="bold" fill="#0a0a0a">BATCH C (S.No 53 - 78): 26 Students</text>
  <line x1="370" y1="205" x2="690" y2="205" stroke="#e5e5e5" stroke-width="2"/>

  <text x="370" y="245" font-family="monospace" font-size="14" font-weight="bold" fill="#ef4444">BATCH D (S.No 79 - 105): 27 Students</text>
  <text x="370" y="270" font-family="sans-serif" font-size="12" fill="#2563eb">↳ Re-Admission Quota: S.No 104, 105</text>
  <line x1="370" y1="285" x2="690" y2="285" stroke="#ef4444" stroke-width="2"/>

  <!-- Verification Checkmarks -->
  <path d="M660,85 L672,97 L695,75" fill="none" stroke="#22c55e" stroke-width="4" stroke-linecap="round"/>
  <path d="M660,135 L672,147 L695,125" fill="none" stroke="#22c55e" stroke-width="4" stroke-linecap="round"/>
  <path d="M660,185 L672,197 L695,175" fill="none" stroke="#22c55e" stroke-width="4" stroke-linecap="round"/>
  <path d="M660,235 L672,247 L695,225" fill="none" stroke="#ef4444" stroke-width="4" stroke-linecap="round"/>

  <!-- Xiaohei (小黑) Figure with Pointer -->
  <ellipse cx="180" cy="260" rx="24" ry="36" fill="#0a0a0a"/>
  <circle cx="180" cy="205" r="20" fill="#0a0a0a"/>
  <circle cx="173" cy="202" r="3" fill="#ffffff"/>
  <circle cx="187" cy="202" r="3" fill="#ffffff"/>
  <!-- Legs -->
  <line x1="168" y1="294" x2="160" y2="370" stroke="#0a0a0a" stroke-width="4" stroke-linecap="round"/>
  <line x1="192" y1="294" x2="200" y2="370" stroke="#0a0a0a" stroke-width="4" stroke-linecap="round"/>
  <!-- Arm holding stick pointing to Batch D -->
  <path d="M195" y1="245" x2="330" y2="245" stroke="#0a0a0a" stroke-width="4" stroke-linecap="round"/>

  <text x="100" y="395" font-family="sans-serif" font-size="13" font-weight="bold" fill="#0a0a0a">小黑 (Xiaohei): Verifying 105 Students across Batches A, B, C & D</text>
</svg>
```

---

### 3. Student Task Submissions & Faculty Evaluation
Xiaohei evaluating student task submissions, assigning grades, and submitting feedback in the Teacher Portal.

```xml
<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; border:1px solid #e5e5e5; border-radius:12px; width:100%; max-width:800px;">
  <!-- Desktop / Desk Layout -->
  <line x1="50" y1="360" x2="750" y2="360" stroke="#0a0a0a" stroke-width="4"/>

  <!-- Student Submission Sheet -->
  <rect x="420" y="80" width="300" height="250" rx="12" fill="#ffffff" stroke="#0a0a0a" stroke-width="3"/>
  <text x="440" y="120" font-family="sans-serif" font-size="14" font-weight="bold" fill="#0a0a0a">Submission #STU-8849</text>
  <text x="440" y="145" font-family="monospace" font-size="12" fill="#6a6a6a">Student: Council Roll #123456789</text>
  <text x="440" y="165" font-family="monospace" font-size="12" fill="#6a6a6a">Batch: Batch A · Front Office Ops</text>
  <line x1="440" y1="180" x2="690" y2="180" stroke="#e5e5e5" stroke-width="2"/>

  <!-- Stamp Grade -->
  <rect x="580" y="210" width="110" height="60" rx="8" fill="#ecfdf5" stroke="#10b981" stroke-width="3"/>
  <text x="600" y="248" font-family="monospace" font-size="22" font-weight="bold" fill="#10b981">28 / 30</text>

  <!-- Xiaohei (小黑) Inspector -->
  <ellipse cx="220" cy="270" rx="24" ry="36" fill="#0a0a0a"/>
  <circle cx="220" cy="215" r="20" fill="#0a0a0a"/>
  <circle cx="213" cy="212" r="3" fill="#ffffff"/>
  <circle cx="227" cy="212" r="3" fill="#ffffff"/>
  <!-- Legs -->
  <line x1="208" y1="304" x2="200" y2="360" stroke="#0a0a0a" stroke-width="4" stroke-linecap="round"/>
  <line x1="232" y1="304" x2="240" y2="360" stroke="#0a0a0a" stroke-width="4" stroke-linecap="round"/>
  <!-- Hand inspecting paper -->
  <path d="M235,255 L415,220" stroke="#0a0a0a" stroke-width="4" stroke-linecap="round"/>

  <!-- Annotation -->
  <text x="140" y="395" font-family="sans-serif" font-size="13" font-weight="bold" fill="#0a0a0a">小黑 (Xiaohei): Grading Batch Submissions with Feedback & Marks</text>
</svg>
```

---

## 🔑 Portal Access Credentials

The portal features role-based access control with distinct header and sidebar profiles for each portal:

| Portal | Authorized Email | Display Identity | Key Features |
| :--- | :--- | :--- | :--- |
| **Teacher Portal** | `rajesh@ihm.edu` | **Mr. Rajesh** *(Faculty, Front Office)* | Create Tasks, Upload Resources, Mark Attendance by Date/Batch, Review Student Submissions |
| **Admin Portal** | `parishashivacharan@gmail.com` | **Institute Admin** | Monitor All 4 Batches (A, B, C, D), Manage User Accounts, Track Attendance Stats |
| **Student Portal** | `123456789@ihm.edu` | **Test Student** *(Council #123456789)* | Profile Verification Setup, View Universes & Resources, Submit Tasks, Check Scorecard |

> 💡 **Dual Role Note**: The account `rajesh@ihm.edu` can seamlessly switch between **Teacher Portal** (`/teacher`) and **Admin Portal** (`/admin`).

---

## 🚀 Key System Features

- **4 Hotel Simulation Universes**:
  1. *Universe 1 — Market Benchmark*
  2. *Universe 2 — Competitive Dynamics*
  3. *Universe 3 — Yield Optimization*
  4. *Universe 4 — Strategic Positioning*
- **105 Student Batch Roster**: Complete roster mapping for 105 second-year students split across **Batch A, B, C, and D**, including Re-Admission quota (S.No 104, 105 in Batch D).
- **Profile Completion Guard**: Interactive setup locking student task submissions until Roll Number and Batch are verified.
- **Batch-Wise Submission Tracking**: Teachers can view student submissions per task filtered by Batch A, B, C, D and assign numerical scores and feedback.

---

## 🛠️ Local Setup & Deployment

To run the application locally:

```bash
# Clone the repository
git clone https://github.com/parishashivacharan/FrontOffice-website.git

# Navigate into the project folder
cd FrontOffice-website

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

Open `http://localhost:5173` in your browser to test the portal.

---

## 📌 Technical Stack

- **Framework**: React 18 + TanStack Router (File-based Routing) + Vite
- **Styling**: Tailwind CSS + Custom CSS Variables
- **Icons**: Lucide React
- **Repository**: [GitHub — parishashivacharan/FrontOffice-website](https://github.com/parishashivacharan/FrontOffice-website)

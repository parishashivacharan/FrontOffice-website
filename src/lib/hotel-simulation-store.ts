// Pro Enterprise Hotel Management Simulation Store & Utilities

export type PurchaseItem = {
  id: string;
  name: string;
  category: "front_office" | "housekeeping";
  budgetedCost: number;
  priorYearCost: number;
  actualCost: number;
  quantity: number;
};

export type HotelSimulationState = {
  // Page 2 & 3: Student Profile
  studentName: string;
  collegeId: string;
  studentRoll: string;
  studentEmail: string;
  loginId?: string;
  hotelId?: string;
  position?: string;
  isOnboarded?: boolean;
  semester: string;
  department: string;
  currentStepPage: number; // 1 to 25

  // Page 4: Hotel Creation / Onboarding
  hotelName: string;
  managerUsername: string;
  hotelType: "Luxury Hotel" | "Business Hotel" | "Budget Hotel";
  starRating: "3★ Star" | "4★ Star" | "5★ Star Luxury";
  location: string;
  numberOfRooms: number; // 100, 150, 200
  isHotelCreated: boolean;

  // Page 5: Role Selection
  selectedRole:
    | "General Manager"
    | "Revenue Manager"
    | "Purchase Manager"
    | "Front Office Manager"
    | "Housekeeping Manager";

  // Page 7-10: Task 1 Revenue Forecast
  task1Username: string;
  task1HotelName: string;
  task1ManagerName: string;
  task1Rooms: number;
  task1Adr: number;
  task1Occupancy: number;
  task1Days: number;

  // Page 11-12: Task 2 Scenario Forecast
  task2HotelType: "Luxury Hotel" | "Business Hotel" | "Budget Hotel";
  task2Season: "Summer Season" | "Monsoon Season" | "Festival Peak Season" | "Winter Season";

  // Page 13-15: Front Office Capital Budget (₹20,00,000)
  foCapitalBudget: number;
  frontOfficeItems: PurchaseItem[];

  // Page 16-18: Housekeeping Capital Budget (₹20,00,000)
  hkCapitalBudget: number;
  housekeepingItems: PurchaseItem[];

  // Page 21: Monthly Revenue Statement
  monthlyRoomsSoldActual: number;
  monthlyRoomsSoldBudget: number;
  roomAllowanceActual: number;
  roomAllowanceBudget: number;
  otherAllowanceActual: number;
  otherAllowanceBudget: number;

  // Page 22: Monthly Operating Expenses Statement
  salariesWagesActual: number;
  salariesWagesBudget: number;
  employeeBenefitsActual: number;
  employeeBenefitsBudget: number;
  guestTransportationActual: number;
  guestTransportationBudget: number;
  operatingSuppliesActual: number;
  operatingSuppliesBudget: number;
  uniformsLaundryActual: number;
  uniformsLaundryBudget: number;
  utilitiesActual: number;
  utilitiesBudget: number;

  // Legacy Fallbacks
  adr: number;
  occupancyPercent: number;
  numberOfDays: number;

  // Submission & Faculty Review State
  isSubmitted: boolean;
  submittedAt?: string;
  facultyGrade?: string;
  facultyFeedback?: string;
};

export const DEFAULT_FO_ITEMS: Omit<PurchaseItem, "actualCost" | "quantity">[] = [
  { id: "fo-1", name: "Reception Counter", category: "front_office", budgetedCost: 300000, priorYearCost: 280000 },
  { id: "fo-2", name: "Desktop Computers", category: "front_office", budgetedCost: 450000, priorYearCost: 420000 },
  { id: "fo-3", name: "Printers & Scanners", category: "front_office", budgetedCost: 80000, priorYearCost: 75000 },
  { id: "fo-4", name: "Key Card Encoder", category: "front_office", budgetedCost: 240000, priorYearCost: 220000 },
  { id: "fo-5", name: "EPABX Telephone System", category: "front_office", budgetedCost: 250000, priorYearCost: 240000 },
  { id: "fo-6", name: "POS Billing Terminal", category: "front_office", budgetedCost: 200000, priorYearCost: 190000 },
  { id: "fo-7", name: "Lobby Sofa Set", category: "front_office", budgetedCost: 220000, priorYearCost: 200000 },
  { id: "fo-8", name: "Bell Trolley", category: "front_office", budgetedCost: 90000, priorYearCost: 80000 },
  { id: "fo-9", name: "Queue Management System", category: "front_office", budgetedCost: 280000, priorYearCost: 260000 },
  { id: "fo-10", name: "CCTV Cameras", category: "front_office", budgetedCost: 120000, priorYearCost: 110000 },
  { id: "fo-11", name: "UPS Backup", category: "front_office", budgetedCost: 60000, priorYearCost: 55000 },
  { id: "fo-12", name: "Office Stationery Pack", category: "front_office", budgetedCost: 50000, priorYearCost: 45000 },
  { id: "fo-13", name: "Uniform Sets", category: "front_office", budgetedCost: 120000, priorYearCost: 100000 },
];

export const DEFAULT_HK_ITEMS: Omit<PurchaseItem, "actualCost" | "quantity">[] = [
  { id: "hk-1", name: "Housekeeping Trolleys", category: "housekeeping", budgetedCost: 240000, priorYearCost: 220000 },
  { id: "hk-2", name: "Vacuum Cleaners", category: "housekeeping", budgetedCost: 180000, priorYearCost: 170000 },
  { id: "hk-3", name: "Floor Scrubbing Machine", category: "housekeeping", budgetedCost: 220000, priorYearCost: 200000 },
  { id: "hk-4", name: "Carpet Shampoo Machine", category: "housekeeping", budgetedCost: 180000, priorYearCost: 160000 },
  { id: "hk-5", name: "Steam Cleaner", category: "housekeeping", budgetedCost: 150000, priorYearCost: 140000 },
  { id: "hk-6", name: "Linen Sets", category: "housekeeping", budgetedCost: 320000, priorYearCost: 300000 },
  { id: "hk-7", name: "Bath Towels", category: "housekeeping", budgetedCost: 160000, priorYearCost: 150000 },
  { id: "hk-8", name: "Bed Sheets", category: "housekeeping", budgetedCost: 180000, priorYearCost: 170000 },
  { id: "hk-9", name: "Pillows", category: "housekeeping", budgetedCost: 120000, priorYearCost: 110000 },
  { id: "hk-10", name: "Mattress Protectors", category: "housekeeping", budgetedCost: 80000, priorYearCost: 75000 },
  { id: "hk-11", name: "Cleaning Chemicals", category: "housekeeping", budgetedCost: 150000, priorYearCost: 140000 },
  { id: "hk-12", name: "Guest Room Amenities", category: "housekeeping", budgetedCost: 100000, priorYearCost: 95000 },
  { id: "hk-13", name: "Laundry Baskets", category: "housekeeping", budgetedCost: 70000, priorYearCost: 65000 },
  { id: "hk-14", name: "Dustbins", category: "housekeeping", budgetedCost: 60000, priorYearCost: 55000 },
  { id: "hk-15", name: "Glass Cleaning Kit", category: "housekeeping", budgetedCost: 50000, priorYearCost: 45000 },
  { id: "hk-16", name: "Mops & Buckets", category: "housekeeping", budgetedCost: 45000, priorYearCost: 40000 },
  { id: "hk-17", name: "Air Fresheners", category: "housekeeping", budgetedCost: 40000, priorYearCost: 35000 },
  { id: "hk-18", name: "Uniform Sets", category: "housekeeping", budgetedCost: 90000, priorYearCost: 85000 },
  { id: "hk-19", name: "Operating Supplies", category: "housekeeping", budgetedCost: 125000, priorYearCost: 115000 },
];

export const INITIAL_SIMULATION_STATE: HotelSimulationState = {
  studentName: "",
  collegeId: "",
  studentRoll: "",
  studentEmail: "",
  semester: "",
  department: "Front Office & Revenue Management",
  currentStepPage: 1,

  hotelName: "",
  managerUsername: "",
  hotelType: "Luxury Hotel",
  starRating: "5★ Star Luxury",
  location: "",
  numberOfRooms: 0,
  isHotelCreated: false,

  selectedRole: "Purchase Manager",

  task1Username: "",
  task1HotelName: "",
  task1ManagerName: "",
  task1Rooms: 0,
  task1Adr: 0,
  task1Occupancy: 0,
  task1Days: 365,

  task2HotelType: "Luxury Hotel",
  task2Season: "Festival Peak Season",

  foCapitalBudget: 2000000, // ₹20,00,000
  hkCapitalBudget: 2000000, // ₹20,00,000

  frontOfficeItems: DEFAULT_FO_ITEMS.map((item) => ({
    ...item,
    actualCost: 0,
    quantity: 1,
  })),

  housekeepingItems: DEFAULT_HK_ITEMS.map((item) => ({
    ...item,
    actualCost: 0,
    quantity: 1,
  })),

  monthlyRoomsSoldActual: 0,
  monthlyRoomsSoldBudget: 0,
  roomAllowanceActual: 0,
  roomAllowanceBudget: 0,
  otherAllowanceActual: 0,
  otherAllowanceBudget: 0,

  salariesWagesActual: 0,
  salariesWagesBudget: 0,
  employeeBenefitsActual: 0,
  employeeBenefitsBudget: 0,
  guestTransportationActual: 0,
  guestTransportationBudget: 0,
  operatingSuppliesActual: 0,
  operatingSuppliesBudget: 0,
  uniformsLaundryActual: 0,
  uniformsLaundryBudget: 0,
  utilitiesActual: 0,
  utilitiesBudget: 0,

  adr: 0,
  occupancyPercent: 0,
  numberOfDays: 365,

  isSubmitted: false,
};

const SIMULATION_STORAGE_KEY = "scholaria:hotel-simulations-v5";

export function getStoredSimulation(studentEmail: string = ""): HotelSimulationState {
  if (typeof window === "undefined") return INITIAL_SIMULATION_STATE;
  try {
    // Purge old legacy keys containing dummy data
    localStorage.removeItem("scholaria:hotel-simulations-v1");
    localStorage.removeItem("scholaria:hotel-simulations-v2");
    localStorage.removeItem("scholaria:hotel-simulations-v3");

    const raw = localStorage.getItem(SIMULATION_STORAGE_KEY);
    if (!raw) return INITIAL_SIMULATION_STATE;
    const all = JSON.parse(raw);
    const key = studentEmail || "current_student";
    const stored = all[key] || all["123456789@ihm.edu"] || all["current_student"];
    if (!stored) return INITIAL_SIMULATION_STATE;

    // Reject legacy dummy strings if present
    if (
      stored.studentName === "Harsha" ||
      stored.hotelName === "Taj Krishna Palace" ||
      stored.managerUsername === "manager@abc" ||
      stored.collegeId === "IHM-HYD-2026"
    ) {
      return INITIAL_SIMULATION_STATE;
    }

    return { ...INITIAL_SIMULATION_STATE, ...stored };
  } catch {
    return INITIAL_SIMULATION_STATE;
  }
}

export function saveStoredSimulation(data: HotelSimulationState) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(SIMULATION_STORAGE_KEY);
    const all = raw ? JSON.parse(raw) : {};
    const key = data.studentEmail || "current_student";
    all[key] = {
      ...data,
      updatedAt: new Date().toISOString(),
    };
    // Also save under fallback keys for instant sync across tabs
    all["current_student"] = all[key];
    localStorage.setItem(SIMULATION_STORAGE_KEY, JSON.stringify(all));
    window.dispatchEvent(new Event("scholaria:simulation-update"));
  } catch (e) {
    console.error(e);
  }
}

export function clearStoredSimulation(studentEmail?: string) {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(SIMULATION_STORAGE_KEY);
    localStorage.removeItem("scholaria:hotel-simulations-v1");
    localStorage.removeItem("scholaria:hotel-simulations-v2");
    localStorage.removeItem("scholaria:hotel-simulations-v3");
    window.dispatchEvent(new Event("scholaria:simulation-update"));
  } catch (e) {
    console.error(e);
  }
}

export function getAllStoredSimulations(): Record<string, HotelSimulationState & { updatedAt?: string }> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(SIMULATION_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function getSimulationForStudentRosterItem(student: { name: string; councilNo: string; email?: string }): HotelSimulationState {
  const all = getAllStoredSimulations();
  const key = student.email || `${student.councilNo.toLowerCase()}@ihm.edu`;

  if (all[key]) return { ...INITIAL_SIMULATION_STATE, ...all[key] };

  const rollNum = parseInt(student.councilNo.replace(/\D/g, "")) || 100;
  const hotelNames = [
    "The Park Hyderabad",
    "Novotel City Center",
    "Marriott Hitech Convention",
    "Hyatt Regency Banjara",
    "ITC Koheneur Luxury Suite",
    "Trident Business Hotel",
  ];

  const hotelName = hotelNames[rollNum % hotelNames.length];
  const foActualsSample = [295000, 440000, 78000, 235000, 245000, 195000, 215000, 88000, 275000, 118000, 58000, 48000, 115000];
  const hkActualsSample = [235000, 175000, 215000, 175000, 145000, 310000, 155000, 175000, 115000, 78000, 145000, 98000, 68000, 58000, 48000, 43000, 38000, 88000, 120000];

  return {
    ...INITIAL_SIMULATION_STATE,
    studentName: student.name,
    studentRoll: student.councilNo,
    studentEmail: key,
    hotelName,
    task1Username: `${student.name.toLowerCase().replace(/\s+/g, ".")}@grandhorizon.com`,
    task1HotelName: hotelName,
    task1ManagerName: student.name,
    task1Rooms: 100,
    task1Adr: 15000,
    task1Occupancy: 70,
    task1Days: 365,

    isHotelCreated: true,

    frontOfficeItems: DEFAULT_FO_ITEMS.map((item, idx) => ({
      ...item,
      actualCost: foActualsSample[idx] || item.budgetedCost,
      quantity: 1,
    })),

    housekeepingItems: DEFAULT_HK_ITEMS.map((item, idx) => ({
      ...item,
      actualCost: hkActualsSample[idx] || item.budgetedCost,
      quantity: 1,
    })),

    isSubmitted: rollNum % 2 === 0,
    submittedAt: "2026-07-30",
  };
}

// Utility Calculation Helpers

export function calculateRevenueForecast(rooms: number, adr: number, occ: number, days: number = 365) {
  const totalAvailableNights = (rooms || 0) * (days || 365);
  const roomsSold = Math.round(totalAvailableNights * ((occ || 0) / 100));
  const annualRevenue = roomsSold * (adr || 0);
  const revPar = totalAvailableNights > 0 ? Math.round(annualRevenue / totalAvailableNights) : 0;

  let occupancyStatus: "Excellent" | "Good" | "Needs Improvement" = "Good";
  if (occ >= 85) occupancyStatus = "Excellent";
  else if (occ < 70) occupancyStatus = "Needs Improvement";

  return {
    totalAvailableNights,
    roomsSold,
    annualRevenue,
    revPar,
    occupancyStatus,
  };
}

export function calculateTask2Matrix(rooms: number = 100, adr: number = 15000, occ: number = 70, days: number = 365) {
  const availableNights = rooms * days;
  const roomsSold = Math.round(availableNights * (occ / 100));
  const revenue = roomsSold * adr;
  const revPar = Math.round(revenue / availableNights);

  return {
    rooms,
    adr,
    occ,
    days,
    availableNights,
    roomsSold,
    revenue,
    revPar,
  };
}

export function calculateFOBudget(foItems: PurchaseItem[], foApprovedBudget: number = 2000000) {
  const totalBudgeted = foItems.reduce((acc, i) => acc + (i.budgetedCost || 0), 0);
  const totalActual = foItems.reduce((acc, i) => acc + (i.actualCost || 0), 0);
  const totalPriorYear = foItems.reduce((acc, i) => acc + (i.priorYearCost || 0), 0);
  const totalVariance = totalBudgeted - totalActual;
  const remainingBudget = foApprovedBudget - totalActual;

  let budgetStatus: "Under Budget" | "Over Budget" | "On Target" = "On Target";
  if (totalActual > foApprovedBudget) budgetStatus = "Over Budget";
  else if (totalActual < foApprovedBudget) budgetStatus = "Under Budget";

  return {
    totalBudgeted,
    totalActual,
    totalPriorYear,
    totalVariance,
    remainingBudget,
    budgetStatus,
  };
}

export function calculateHKBudget(hkItems: PurchaseItem[], hkApprovedBudget: number = 2000000) {
  const totalBudgeted = hkItems.reduce((acc, i) => acc + (i.budgetedCost || 0), 0);
  const totalActual = hkItems.reduce((acc, i) => acc + (i.actualCost || 0), 0);
  const totalPriorYear = hkItems.reduce((acc, i) => acc + (i.priorYearCost || 0), 0);
  const totalVariance = totalBudgeted - totalActual;
  const remainingBudget = hkApprovedBudget - totalActual;

  let budgetStatus: "Under Budget" | "Over Budget" | "On Target" = "On Target";
  if (totalActual > hkApprovedBudget) budgetStatus = "Over Budget";
  else if (totalActual < hkApprovedBudget) budgetStatus = "Under Budget";

  return {
    totalBudgeted,
    totalActual,
    totalPriorYear,
    totalVariance,
    remainingBudget,
    budgetStatus,
  };
}

export function calculateBudgetTotals(
  foItems: PurchaseItem[],
  hkItems: PurchaseItem[],
  totalCapitalBudget: number = 4000000
) {
  const fo = calculateFOBudget(foItems, 2000000);
  const hk = calculateHKBudget(hkItems, 2000000);

  const combinedBudgeted = fo.totalBudgeted + hk.totalBudgeted;
  const combinedActual = fo.totalActual + hk.totalActual;
  const combinedPriorYear = fo.totalPriorYear + hk.totalPriorYear;
  const combinedVariance = combinedBudgeted - combinedActual;

  const remainingBudget = totalCapitalBudget - combinedActual;
  let budgetStatus: "Under Budget" | "Over Budget" | "On Target" = "On Target";
  if (combinedActual > totalCapitalBudget) budgetStatus = "Over Budget";
  else if (combinedActual < totalCapitalBudget) budgetStatus = "Under Budget";

  return {
    foBudgeted: fo.totalBudgeted,
    foActual: fo.totalActual,
    foPriorYear: fo.totalPriorYear,
    foVariance: fo.totalVariance,
    foRemaining: fo.remainingBudget,
    foStatus: fo.budgetStatus,

    hkBudgeted: hk.totalBudgeted,
    hkActual: hk.totalActual,
    hkPriorYear: hk.totalPriorYear,
    hkVariance: hk.totalVariance,
    hkRemaining: hk.remainingBudget,
    hkStatus: hk.budgetStatus,

    combinedBudgeted,
    combinedActual,
    combinedPriorYear,
    combinedVariance,
    remainingBudget,
    budgetStatus,
  };
}

export function calculateMonthlyPnL(state: HotelSimulationState) {
  const roomPriceAvg = state.task1Adr || 15000;
  const grossRevenueActual = (state.monthlyRoomsSoldActual || 0) * roomPriceAvg;
  const grossRevenueBudget = (state.monthlyRoomsSoldBudget || 0) * roomPriceAvg;

  const totalAllowancesActual = (state.roomAllowanceActual || 0) + (state.otherAllowanceActual || 0);
  const totalAllowancesBudget = (state.roomAllowanceBudget || 0) + (state.otherAllowanceBudget || 0);

  const netRevenueActual = Math.max(0, grossRevenueActual - totalAllowancesActual);
  const netRevenueBudget = Math.max(0, grossRevenueBudget - totalAllowancesBudget);
  const netRevenueVarDollar = netRevenueActual - netRevenueBudget;
  const netRevenueVarPct = netRevenueBudget > 0 ? (netRevenueVarDollar / netRevenueBudget) * 100 : 0;

  const totalExpensesActual =
    (state.salariesWagesActual || 0) +
    (state.employeeBenefitsActual || 0) +
    (state.guestTransportationActual || 0) +
    (state.operatingSuppliesActual || 0) +
    (state.uniformsLaundryActual || 0) +
    (state.utilitiesActual || 0);

  const totalExpensesBudget =
    (state.salariesWagesBudget || 0) +
    (state.employeeBenefitsBudget || 0) +
    (state.guestTransportationBudget || 0) +
    (state.operatingSuppliesBudget || 0) +
    (state.uniformsLaundryBudget || 0) +
    (state.utilitiesBudget || 0);

  const expensesVarDollar = totalExpensesActual - totalExpensesBudget;
  const expensesVarPct = totalExpensesBudget > 0 ? (expensesVarDollar / totalExpensesBudget) * 100 : 0;

  const gopActual = netRevenueActual - totalExpensesActual;
  const gopBudget = netRevenueBudget - totalExpensesBudget;
  const gopVarDollar = gopActual - gopBudget;

  return {
    grossRevenueActual,
    grossRevenueBudget,
    totalAllowancesActual,
    totalAllowancesBudget,
    netRevenueActual,
    netRevenueBudget,
    netRevenueVarDollar,
    netRevenueVarPct,

    totalExpensesActual,
    totalExpensesBudget,
    expensesVarDollar,
    expensesVarPct,

    gopActual,
    gopBudget,
    gopVarDollar,
  };
}

export function calculatePerformanceScores(
  occPercent: number,
  remainingBudget: number,
  foItems: PurchaseItem[],
  hkItems: PurchaseItem[]
) {
  const foEntered = foItems.filter((i) => (i.actualCost || 0) > 0).length;
  const hkEntered = hkItems.filter((i) => (i.actualCost || 0) > 0).length;
  const totalEntered = foEntered + hkEntered;

  const isStarted = occPercent > 0 || totalEntered > 0;

  if (!isStarted) {
    return {
      revenueScore: "Needs Improvement" as const,
      budgetScore: "Needs Improvement" as const,
      purchaseScore: "Needs Improvement" as const,
      numericScore: 0,
      isStarted: false,
    };
  }

  let revenueScore: "Excellent" | "Good" | "Needs Improvement" = "Good";
  if (occPercent >= 85) revenueScore = "Excellent";
  else if (occPercent < 70) revenueScore = "Needs Improvement";

  let budgetScore: "Excellent" | "Good" | "Needs Improvement" = "Good";
  if (remainingBudget >= 0 && remainingBudget <= 200000) budgetScore = "Excellent";
  else if (remainingBudget < 0) budgetScore = "Needs Improvement";

  let purchaseScore: "Excellent" | "Good" | "Needs Improvement" = "Good";
  if (totalEntered >= 25) purchaseScore = "Excellent";

  let numericScore = 0;
  if (occPercent > 0) {
    numericScore += occPercent >= 85 ? 30 : occPercent >= 70 ? 25 : 15;
  }
  if (totalEntered > 0) {
    numericScore += Math.min(40, Math.round((totalEntered / 32) * 40));
  }
  if (remainingBudget >= 0) {
    numericScore += 30;
  } else {
    numericScore += 10;
  }

  numericScore = Math.min(100, Math.max(0, numericScore));

  return {
    revenueScore,
    budgetScore,
    purchaseScore,
    numericScore,
    isStarted: true,
  };
}

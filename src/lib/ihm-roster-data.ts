export interface IHMStudentRecord {
  slNo: number;
  councilNo: string; // Roll number e.g. 2541112060
  name: string;
  batch: "A" | "B" | "C" | "D";
  semester: string; // "Semester 3"
  academicYear: string; // "2026-27"
  course: string; // "Second Year B.Sc. in H & HA"
  email: string; // rollno@ihm.edu
  isReAdmission?: boolean;
}

export const IHM_STUDENT_ROSTER: IHMStudentRecord[] = [
  // ── BATCH - A (1 to 27) ──
  { slNo: 1, councilNo: "2541112060", name: "DEVARAJU ANANYA PRAKASH", batch: "A", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112060@ihm.edu" },
  { slNo: 2, councilNo: "2541112120", name: "MADASTAM SHRUTHI", batch: "A", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112120@ihm.edu" },
  { slNo: 3, councilNo: "2541112121", name: "MADHUR JINDAL", batch: "A", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112121@ihm.edu" },
  { slNo: 4, councilNo: "2541112123", name: "MANE SHRADDHA LAXMAN", batch: "A", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112123@ihm.edu" },
  { slNo: 5, councilNo: "2541112124", name: "MANKIDI KOMAL SRIRAM", batch: "A", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112124@ihm.edu" },
  { slNo: 6, councilNo: "2541112125", name: "MANNEM BHARATH REDDY", batch: "A", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112125@ihm.edu" },
  { slNo: 7, councilNo: "2541112126", name: "MANYA", batch: "A", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112126@ihm.edu" },
  { slNo: 8, councilNo: "2541112127", name: "MARTHALA TEJA REDDY", batch: "A", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112127@ihm.edu" },
  { slNo: 9, councilNo: "2541112128", name: "MD ANAS ALI", batch: "A", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112128@ihm.edu" },
  { slNo: 10, councilNo: "2541112129", name: "MD DANISH", batch: "A", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112129@ihm.edu" },
  { slNo: 11, councilNo: "2541112131", name: "MUHAMMED AL ZAHID S", batch: "A", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112131@ihm.edu" },
  { slNo: 12, councilNo: "2541112132", name: "MUHAMMED HADIL V K", batch: "A", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112132@ihm.edu" },
  { slNo: 13, councilNo: "2541112133", name: "MUHAMMED RAZIK A", batch: "A", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112133@ihm.edu" },
  { slNo: 14, councilNo: "2541112134", name: "MUKTI ASHISH SOMANI", batch: "A", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112134@ihm.edu" },
  { slNo: 15, councilNo: "2541112136", name: "N NIKHIL SAI", batch: "A", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112136@ihm.edu" },
  { slNo: 16, councilNo: "2541112137", name: "N PRIYANSHU", batch: "A", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112137@ihm.edu" },
  { slNo: 17, councilNo: "2541112138", name: "NABIL ALI", batch: "A", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112138@ihm.edu" },
  { slNo: 18, councilNo: "2541112139", name: "NADIGADDA ABHISHEK", batch: "A", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112139@ihm.edu" },
  { slNo: 19, councilNo: "2541112140", name: "NADIPELLI ADARSH RAO", batch: "A", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112140@ihm.edu" },
  { slNo: 20, councilNo: "2541112142", name: "NANDAKUMAR A H", batch: "A", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112142@ihm.edu" },
  { slNo: 21, councilNo: "2541112143", name: "NAREDDIWAR DRUPAD PRAMOD", batch: "A", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112143@ihm.edu" },
  { slNo: 22, councilNo: "2541112144", name: "NEERAJ", batch: "A", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112144@ihm.edu" },
  { slNo: 23, councilNo: "2541112145", name: "NEERAJ BISHT", batch: "A", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112145@ihm.edu" },
  { slNo: 24, councilNo: "2541112146", name: "NIKHIL MANOJ VERGHESE", batch: "A", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112146@ihm.edu" },
  { slNo: 25, councilNo: "2541112147", name: "NISHANT KUMAR", batch: "A", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112147@ihm.edu" },
  { slNo: 26, councilNo: "2541112148", name: "ODAPALLY PAVAN KUMAR", batch: "A", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112148@ihm.edu" },
  { slNo: 27, councilNo: "2541112149", name: "PAARTHASAARTHI R", batch: "A", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112149@ihm.edu" },

  // ── BATCH - B (28 to 53) ──
  { slNo: 28, councilNo: "2541112151", name: "PARANJPE SHARDUL MAHESH", batch: "B", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112151@ihm.edu" },
  { slNo: 29, councilNo: "2541112152", name: "PARI DHARMADHIKARI", batch: "B", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112152@ihm.edu" },
  { slNo: 30, councilNo: "2541112153", name: "PARISHA SHIVA CHARAN", batch: "B", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112153@ihm.edu" },
  { slNo: 31, councilNo: "2541112155", name: "PAWAR ATHARV AMOL", batch: "B", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112155@ihm.edu" },
  { slNo: 32, councilNo: "2541112156", name: "PILANKAR SOHAM SUJIT", batch: "B", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112156@ihm.edu" },
  { slNo: 33, councilNo: "2541112157", name: "PIYASU CHAKRABORTY", batch: "B", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112157@ihm.edu" },
  { slNo: 34, councilNo: "2541112158", name: "PONUGOTI SANTHOSH KUMAR", batch: "B", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112158@ihm.edu" },
  { slNo: 35, councilNo: "2541112159", name: "PONUGOTI VARSHITH", batch: "B", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112159@ihm.edu" },
  { slNo: 36, councilNo: "2541112160", name: "POONAM BHAGAT", batch: "B", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112160@ihm.edu" },
  { slNo: 37, councilNo: "2541112161", name: "POORVI VASHISHT", batch: "B", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112161@ihm.edu" },
  { slNo: 38, councilNo: "2541112162", name: "POOSARLA AKSHAYA", batch: "B", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112162@ihm.edu" },
  { slNo: 39, councilNo: "2541112163", name: "PRASHANT", batch: "B", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112163@ihm.edu" },
  { slNo: 40, councilNo: "2541112164", name: "PRASHANT CHORATH", batch: "B", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112164@ihm.edu" },
  { slNo: 41, councilNo: "2541112165", name: "PRASHANT KUMAR", batch: "B", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112165@ihm.edu" },
  { slNo: 42, councilNo: "2541112166", name: "PRAVEEN S", batch: "B", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112166@ihm.edu" },
  { slNo: 43, councilNo: "2541112167", name: "PRINCE KUMAR", batch: "B", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112167@ihm.edu" },
  { slNo: 44, councilNo: "2541112168", name: "PRISHA SINGH", batch: "B", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112168@ihm.edu" },
  { slNo: 45, councilNo: "2541112169", name: "PURUPRIYE JHA", batch: "B", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112169@ihm.edu" },
  { slNo: 46, councilNo: "2541112170", name: "PUSKURI BHUVANESHWAR", batch: "B", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112170@ihm.edu" },
  { slNo: 47, councilNo: "2541112171", name: "R KARTHIKEYAN", batch: "B", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112171@ihm.edu" },
  { slNo: 48, councilNo: "2541112173", name: "RAMAN TYAGI", batch: "B", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112173@ihm.edu" },
  { slNo: 49, councilNo: "2541112175", name: "RISHI VEERA G", batch: "B", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112175@ihm.edu" },
  { slNo: 50, councilNo: "2541112176", name: "RITESH KUMAR SHARMA", batch: "B", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112176@ihm.edu" },
  { slNo: 51, councilNo: "2541112177", name: "RITHIK NANDU", batch: "B", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112177@ihm.edu" },
  { slNo: 52, councilNo: "2541112178", name: "RITHIN MAMMAN", batch: "B", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112178@ihm.edu" },
  { slNo: 53, councilNo: "2541112179", name: "RITHURAJ M", batch: "B", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112179@ihm.edu" },

  // ── BATCH - C (54 to 79) ──
  { slNo: 54, councilNo: "2541112180", name: "ROHIN EB", batch: "C", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112180@ihm.edu" },
  { slNo: 55, councilNo: "2541112181", name: "RUPSHA GHOSH", batch: "C", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112181@ihm.edu" },
  { slNo: 56, councilNo: "2541112182", name: "SAKSHAM SHARMA", batch: "C", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112182@ihm.edu" },
  { slNo: 57, councilNo: "2541112183", name: "SALUNKE KRISHNA ANIL", batch: "C", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112183@ihm.edu" },
  { slNo: 58, councilNo: "2541112184", name: "SALUNKHE SHAHU VISHAL", batch: "C", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112184@ihm.edu" },
  { slNo: 59, councilNo: "2541112185", name: "SANDANA RUPESH", batch: "C", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112185@ihm.edu" },
  { slNo: 60, councilNo: "2541112186", name: "SARTHAK VYAVAHARE", batch: "C", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112186@ihm.edu" },
  { slNo: 61, councilNo: "2541112187", name: "SATINDER SINGH", batch: "C", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112187@ihm.edu" },
  { slNo: 62, councilNo: "2541112188", name: "SD AMRUTHA SIRI", batch: "C", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112188@ihm.edu" },
  { slNo: 63, councilNo: "2541112189", name: "SHAHANA R", batch: "C", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112189@ihm.edu" },
  { slNo: 64, councilNo: "2541112190", name: "SHAIK MEHAK", batch: "C", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112190@ihm.edu" },
  { slNo: 65, councilNo: "2541112191", name: "SHAIK SAMEER", batch: "C", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112191@ihm.edu" },
  { slNo: 66, councilNo: "2541112193", name: "SHLOK BHARDWAJ", batch: "C", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112193@ihm.edu" },
  { slNo: 67, councilNo: "2541112194", name: "SILIYA AHMED", batch: "C", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112194@ihm.edu" },
  { slNo: 68, councilNo: "2541112195", name: "SINGH SHREYASH SANJAY", batch: "C", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112195@ihm.edu" },
  { slNo: 69, councilNo: "2541112196", name: "SINGIRALA SHASHANK", batch: "C", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112196@ihm.edu" },
  { slNo: 70, councilNo: "2541112197", name: "SIRIGIREDDY AMARISWARI", batch: "C", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112197@ihm.edu" },
  { slNo: 71, councilNo: "2541112198", name: "SIRSIKAR HIMANSHU PRAKASH", batch: "C", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112198@ihm.edu" },
  { slNo: 72, councilNo: "2541112199", name: "SNEHA LAXMI", batch: "C", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112199@ihm.edu" },
  { slNo: 73, councilNo: "2541112200", name: "SOHOM DASS", batch: "C", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112200@ihm.edu" },
  { slNo: 74, councilNo: "2541112201", name: "SOMYA RANI", batch: "C", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112201@ihm.edu" },
  { slNo: 75, councilNo: "2541112202", name: "SRIJA PAUL", batch: "C", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112202@ihm.edu" },
  { slNo: 76, councilNo: "2541112203", name: "SUHANI SHUBH", batch: "C", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112203@ihm.edu" },
  { slNo: 77, councilNo: "2541112204", name: "SUHANI SUHAS PINGAT", batch: "C", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112204@ihm.edu" },
  { slNo: 78, councilNo: "2541112205", name: "SURYAA K S", batch: "C", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112205@ihm.edu" },
  { slNo: 79, councilNo: "2541112206", name: "SWASTIK GUPTA", batch: "C", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112206@ihm.edu" },

  // ── BATCH - D (80 to 103 + Re-Admission 104 & 105) ──
  { slNo: 80, councilNo: "2541112207", name: "SWATI PATHAK", batch: "D", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112207@ihm.edu" },
  { slNo: 81, councilNo: "2541112208", name: "TADI RUSHIL", batch: "D", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112208@ihm.edu" },
  { slNo: 82, councilNo: "2541112209", name: "TAMMINANA NIKHIL KUMAR SAI", batch: "D", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112209@ihm.edu" },
  { slNo: 83, councilNo: "2541112210", name: "TANZIL RASTOGI", batch: "D", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112210@ihm.edu" },
  { slNo: 84, councilNo: "2541112211", name: "TARIGOPPULA SAI ADITYA ROSHAN", batch: "D", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112211@ihm.edu" },
  { slNo: 85, councilNo: "2541112212", name: "TARIQ AHMED", batch: "D", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112212@ihm.edu" },
  { slNo: 86, councilNo: "2541112213", name: "TEJAL CHIDE", batch: "D", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112213@ihm.edu" },
  { slNo: 87, councilNo: "2541112214", name: "THEA WONG CHUN PHIN", batch: "D", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112214@ihm.edu" },
  { slNo: 88, councilNo: "2541112215", name: "THERES SEBASTIAN", batch: "D", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112215@ihm.edu" },
  { slNo: 89, councilNo: "2541112216", name: "THIYA SUPTI SURAJ", batch: "D", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112216@ihm.edu" },
  { slNo: 90, councilNo: "2541112217", name: "UDDAMARI VINAY", batch: "D", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112217@ihm.edu" },
  { slNo: 91, councilNo: "2541112218", name: "UTKARSH RAJENDRA SHARMA", batch: "D", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112218@ihm.edu" },
  { slNo: 92, councilNo: "2541112219", name: "VANGARI RADHESH", batch: "D", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112219@ihm.edu" },
  { slNo: 93, councilNo: "2541112220", name: "VANKAYALAPATI KARTHIK", batch: "D", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112220@ihm.edu" },
  { slNo: 94, councilNo: "2541112221", name: "VANKUDOTH AJITH", batch: "D", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112221@ihm.edu" },
  { slNo: 95, councilNo: "2541112222", name: "VARNIKA REDDY DEVENDRAPPAGARI", batch: "D", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112222@ihm.edu" },
  { slNo: 96, councilNo: "2541112223", name: "VEDA VYAS S", batch: "D", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112223@ihm.edu" },
  { slNo: 97, councilNo: "2541112224", name: "VELLORE NAYAN KAUSHIK", batch: "D", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112224@ihm.edu" },
  { slNo: 98, councilNo: "2541112225", name: "VINAYAK", batch: "D", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112225@ihm.edu" },
  { slNo: 99, councilNo: "2541112226", name: "WAGHMARE TANVI SUNIL", batch: "D", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112226@ihm.edu" },
  { slNo: 100, councilNo: "2541112227", name: "YASH VISHWAKARMA", batch: "D", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112227@ihm.edu" },
  { slNo: 101, councilNo: "2541112228", name: "YELIGETI PAVAN KUMAR", batch: "D", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112228@ihm.edu" },
  { slNo: 102, councilNo: "2541112230", name: "YERRAJU HEMASRI", batch: "D", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112230@ihm.edu" },
  { slNo: 103, councilNo: "2541112231", name: "YENUGU UMAKESAVA REDDY", batch: "D", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2541112231@ihm.edu" },

  // ── RE-ADMISSION (Sl No 104 & 105 added to BATCH - D) ──
  { slNo: 104, councilNo: "2441112164", name: "SAGAR", batch: "D", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2441112164@ihm.edu", isReAdmission: true },
  { slNo: 105, councilNo: "2441112211", name: "VATSAL SHARMA", batch: "D", semester: "Semester 3", academicYear: "2026-27", course: "Second Year B.Sc. in H & HA", email: "2441112211@ihm.edu", isReAdmission: true },
];

export interface AttendanceRecord {
  id: string; // e.g. "2026-07-29-2541112060"
  date: string; // "2026-07-29"
  councilNo: string;
  studentName: string;
  batch: "A" | "B" | "C" | "D";
  status: "Present" | "Absent";
  markedBy: string; // Teacher name
  markedAt: string; // ISO timestamp
}

const ATTENDANCE_STORAGE_KEY = "scholaria:attendance";

export function getStoredAttendance(): AttendanceRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ATTENDANCE_STORAGE_KEY);
    if (!raw) return getInitialSeedAttendance();
    return JSON.parse(raw);
  } catch (e) {
    return getInitialSeedAttendance();
  }
}

export function saveAttendance(records: AttendanceRecord[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(ATTENDANCE_STORAGE_KEY, JSON.stringify(records));
  } catch (e) {
    console.error("Failed to save attendance", e);
  }
}

// Initial seed attendance for demo purposes
function getInitialSeedAttendance(): AttendanceRecord[] {
  const dates = ["2026-07-25", "2026-07-26", "2026-07-27", "2026-07-28", "2026-07-29"];
  const records: AttendanceRecord[] = [];

  IHM_STUDENT_ROSTER.forEach((student, index) => {
    dates.forEach((date, dIdx) => {
      // 92% present seed
      const isPresent = (index + dIdx) % 11 !== 0;
      records.push({
        id: `${date}-${student.councilNo}`,
        date,
        councilNo: student.councilNo,
        studentName: student.name,
        batch: student.batch,
        status: isPresent ? "Present" : "Absent",
        markedBy: "Mr. Rajesh",
        markedAt: new Date(date).toISOString(),
      });
    });
  });

  return records;
}

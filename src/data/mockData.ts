import { StudentProfile, SubjectAttendance, SemesterResult, TimetableSlot, NoteFile, NoticeItem, SyllabusCourse } from '../types';

export const DEMO_STUDENTS: StudentProfile[] = [
  {
    id: 'pankaj-kumar',
    rollNo: '261000020368',
    urn: '261000020368',
    ptuReg: '261000020368',
    name: 'Pankaj Kumar',
    email: 'pk2173895@gmail.com',
    phone: '+91 98765 20368',
    course: 'B.Tech',
    branch: 'CSE (AI & ML)',
    semester: 1,
    section: 'Sec AIML-1',
    campus: 'CGC University Mohali',
    cgpa: 9.15,
    overallAttendance: 88.5,
    totalAttendedClasses: 84,
    totalHeldClasses: 95,
    mentor: 'Ms. Garima Singh Thakur',
    hostel: 'Einstein Hostel (Inside Campus)',
    busRoute: 'Campus Resident (Einstein Hostel)',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    abcId: '2610-0002-0368',
    transferredCredits: 20,
    requiredCredits: 160,
    nptelCredits: 4,
    batchYear: '2026-2030',
    validUpto: 'JUN 2030'
  },
  {
    id: 'simran-kaur',
    rollNo: '2105112',
    urn: '2105112',
    ptuReg: '2105112004',
    name: 'Simran Kaur',
    email: 'simran.2105112@cgc.edu.in',
    phone: '+91 98123 45678',
    course: 'B.Tech',
    branch: 'Computer Science & Engineering',
    semester: 6,
    section: 'Sec A',
    campus: 'Landran Campus',
    cgpa: 9.12,
    overallAttendance: 91.5,
    totalAttendedClasses: 118,
    totalHeldClasses: 129,
    mentor: 'Prof. Hardeep Singh',
    hostel: 'Kalpana Chawla Girls Hostel (Rm 114)',
    busRoute: 'Route #08 (Mohali Phase 7)',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    abcId: '6523-8812-4402',
    transferredCredits: 110,
    requiredCredits: 160,
    nptelCredits: 12,
    batchYear: '2022-2026',
    validUpto: 'JUN 2026'
  },
  {
    id: 'rohan-verma',
    rollNo: '2203045',
    urn: '2203045',
    ptuReg: '2203045012',
    name: 'Rohan Verma',
    email: 'rohan.2203045@cgc.edu.in',
    phone: '+91 97890 12345',
    course: 'B.Tech',
    branch: 'Information Technology',
    semester: 3,
    section: 'Sec A',
    campus: 'Jhanjeri Campus',
    cgpa: 7.95,
    overallAttendance: 78.4,
    totalAttendedClasses: 76,
    totalHeldClasses: 97,
    mentor: 'Dr. Gurpreet Singh',
    hostel: 'Day Scholar (Private Conveyance)',
    busRoute: 'Route #22 (Panchkula MDC)',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    abcId: '8112-9901-3345',
    transferredCredits: 42,
    requiredCredits: 160,
    nptelCredits: 4,
    batchYear: '2023-2027',
    validUpto: 'JUN 2027'
  }
];

export const SUBJECT_ATTENDANCE: SubjectAttendance[] = [
  {
    code: 'BTAI-101',
    name: 'Foundations of AI & Python Programming',
    attended: 31,
    total: 34,
    percentage: 91.2,
    safeMiss: 4,
    credits: 4,
    faculty: 'Ms. Garima Singh Thakur'
  },
  {
    code: 'BTAM-101',
    name: 'Applied Mathematics - I (Calculus & Linear Algebra)',
    attended: 28,
    total: 32,
    percentage: 87.5,
    safeMiss: 3,
    credits: 4,
    faculty: 'Dr. Manjit Singh'
  },
  {
    code: 'BTPH-101',
    name: 'Engineering Physics & Quantum Basics',
    attended: 25,
    total: 29,
    percentage: 86.2,
    safeMiss: 3,
    credits: 3,
    faculty: 'Dr. Ravinder Sharma'
  }
];

export const SEMESTER_RESULTS: SemesterResult[] = [
  {
    semester: 1,
    sgpa: 8.40,
    creditsEarned: 20,
    totalCredits: 20,
    status: 'Pass',
    subjects: [
      { code: 'BTPH-101', name: 'Engineering Physics', credits: 4, grade: 'A', gradePoints: 8.0, internalMarks: 36, externalMarks: 52, totalMarks: 88, status: 'Pass' },
      { code: 'BTAM-101', name: 'Applied Mathematics - I', credits: 4, grade: 'A+', gradePoints: 9.0, internalMarks: 38, externalMarks: 56, totalMarks: 94, status: 'Pass' },
      { code: 'BTEE-101', name: 'Basic Electrical Engineering', credits: 4, grade: 'A', gradePoints: 8.0, internalMarks: 35, externalMarks: 49, totalMarks: 84, status: 'Pass' },
      { code: 'HVPE-101', name: 'Human Values & Ethics', credits: 3, grade: 'O', gradePoints: 10.0, internalMarks: 40, externalMarks: 58, totalMarks: 98, status: 'Pass' },
      { code: 'BTPH-102', name: 'Physics Laboratory', credits: 1, grade: 'O', gradePoints: 10.0, internalMarks: 45, externalMarks: 47, totalMarks: 92, status: 'Pass' }
    ]
  },
  {
    semester: 2,
    sgpa: 8.52,
    creditsEarned: 22,
    totalCredits: 22,
    status: 'Pass',
    subjects: [
      { code: 'BTCH-101', name: 'Engineering Chemistry', credits: 4, grade: 'A', gradePoints: 8.0, internalMarks: 35, externalMarks: 51, totalMarks: 86, status: 'Pass' },
      { code: 'BTAM-102', name: 'Applied Mathematics - II', credits: 4, grade: 'A+', gradePoints: 9.0, internalMarks: 37, externalMarks: 55, totalMarks: 92, status: 'Pass' },
      { code: 'BTCS-101', name: 'Programming for Problem Solving', credits: 4, grade: 'O', gradePoints: 10.0, internalMarks: 39, externalMarks: 58, totalMarks: 97, status: 'Pass' },
      { code: 'BTME-101', name: 'Engineering Graphics & Design', credits: 3, grade: 'B+', gradePoints: 7.0, internalMarks: 32, externalMarks: 45, totalMarks: 77, status: 'Pass' },
      { code: 'BTCS-102', name: 'Programming Lab (C/C++)', credits: 1.5, grade: 'O', gradePoints: 10.0, internalMarks: 48, externalMarks: 48, totalMarks: 96, status: 'Pass' }
    ]
  },
  {
    semester: 3,
    sgpa: 8.95,
    creditsEarned: 22,
    totalCredits: 22,
    status: 'Pass',
    subjects: [
      { code: 'BTCS-301', name: 'Data Structures & Algorithms', credits: 4, grade: 'A+', gradePoints: 9.0, internalMarks: 38, externalMarks: 56, totalMarks: 94, status: 'Pass' },
      { code: 'BTCS-302', name: 'Object Oriented Programming (Java)', credits: 4, grade: 'O', gradePoints: 10.0, internalMarks: 40, externalMarks: 59, totalMarks: 99, status: 'Pass' },
      { code: 'BTEC-301', name: 'Digital Electronics', credits: 3, grade: 'A', gradePoints: 8.0, internalMarks: 34, externalMarks: 50, totalMarks: 84, status: 'Pass' },
      { code: 'BTCS-303', name: 'Software Engineering Principles', credits: 3, grade: 'A+', gradePoints: 9.0, internalMarks: 37, externalMarks: 54, totalMarks: 91, status: 'Pass' },
      { code: 'BTAM-301', name: 'Discrete Mathematics', credits: 4, grade: 'A', gradePoints: 8.0, internalMarks: 35, externalMarks: 51, totalMarks: 86, status: 'Pass' },
      { code: 'BTCS-304', name: 'Data Structures Lab', credits: 1.5, grade: 'O', gradePoints: 10.0, internalMarks: 49, externalMarks: 48, totalMarks: 97, status: 'Pass' }
    ]
  },
  {
    semester: 4,
    sgpa: 0,
    creditsEarned: 0,
    totalCredits: 22,
    status: 'Active (Current Semester)',
    subjects: [
      { code: 'BTCS-401', name: 'Operating Systems', credits: 4, grade: 'Pending', gradePoints: 0, internalMarks: 23, externalMarks: 0, totalMarks: 23, status: 'In Progress' },
      { code: 'BTCS-402', name: 'Design & Analysis of Algorithms', credits: 4, grade: 'Pending', gradePoints: 0, internalMarks: 22, externalMarks: 0, totalMarks: 22, status: 'In Progress' },
      { code: 'BTCS-403', name: 'Database Management Systems', credits: 3, grade: 'Pending', gradePoints: 0, internalMarks: 24, externalMarks: 0, totalMarks: 24, status: 'In Progress' },
      { code: 'BTCS-404', name: 'Computer Organization & Architecture', credits: 3, grade: 'Pending', gradePoints: 0, internalMarks: 21, externalMarks: 0, totalMarks: 21, status: 'In Progress' },
      { code: 'BTCS-405', name: 'Operating Systems Lab', credits: 1.5, grade: 'Pending', gradePoints: 0, internalMarks: 28, externalMarks: 0, totalMarks: 28, status: 'In Progress' }
    ]
  }
];

export const TIMETABLE_DATA: Record<string, TimetableSlot[]> = {
  MON: [
    { id: 'm1', day: 'MON', time: '09:00 AM', endTime: '10:00 AM', subject: 'Database Management Systems', subjectCode: 'BTCS-403', room: 'Rm 304', block: 'Block 3', instructor: 'Prof. Rajesh Kumar', type: 'Lecture', status: 'completed' },
    { id: 'm2', day: 'MON', time: '10:00 AM', endTime: '11:00 AM', subject: 'Operating Systems', subjectCode: 'BTCS-401', room: 'Rm 402', block: 'Block 3', instructor: 'Dr. Preetinder Kaur', type: 'Lecture', status: 'completed' },
    { id: 'm3', day: 'MON', time: '11:15 AM', endTime: '01:15 PM', subject: 'OS Linux Kernel Lab (Batch B1)', subjectCode: 'BTCS-405', room: 'Lab 4', block: 'Central Computing Center', instructor: 'Dr. Preetinder Kaur', type: 'Lab', status: 'completed' },
    { id: 'm4', day: 'MON', time: '02:00 PM', endTime: '03:00 PM', subject: 'Design & Analysis of Algorithms', subjectCode: 'BTCS-402', room: 'Rm 402', block: 'Block 3', instructor: 'Prof. Hardeep Singh', type: 'Lecture', status: 'completed' }
  ],
  TUE: [
    { id: 't1', day: 'TUE', time: '09:00 AM', endTime: '10:00 AM', subject: 'Computer Organization & Architecture', subjectCode: 'BTCS-404', room: 'Rm 402', block: 'Block 3', instructor: 'Dr. Amanpreet Singh', type: 'Lecture', status: 'completed' },
    { id: 't2', day: 'TUE', time: '10:00 AM', endTime: '11:00 AM', subject: 'Design & Analysis of Algorithms', subjectCode: 'BTCS-402', room: 'Rm 402', block: 'Block 3', instructor: 'Prof. Hardeep Singh', type: 'Lecture', status: 'completed' },
    { id: 't3', day: 'TUE', time: '11:15 AM', endTime: '12:15 PM', subject: 'Universal Human Values', subjectCode: 'HSMC-122', room: 'Audi 2', block: 'Block 2', instructor: 'Prof. Neha Gupta', type: 'Lecture', status: 'completed' },
    { id: 't4', day: 'TUE', time: '01:30 PM', endTime: '03:30 PM', subject: 'DAA Algorithms Lab (Batch B1)', subjectCode: 'BTCS-406', room: 'Lab 2', block: 'Central Computing Center', instructor: 'Prof. Hardeep Singh', type: 'Lab', status: 'completed' }
  ],
  WED: [
    { id: 'w1', day: 'WED', time: '09:00 AM', endTime: '10:00 AM', subject: 'Operating Systems', subjectCode: 'BTCS-401', room: 'Rm 402', block: 'Block 3', instructor: 'Dr. Preetinder Kaur', type: 'Lecture', status: 'completed' },
    { id: 'w2', day: 'WED', time: '10:00 AM', endTime: '11:00 AM', subject: 'Database Management Systems', subjectCode: 'BTCS-403', room: 'Rm 304', block: 'Block 3', instructor: 'Prof. Rajesh Kumar', type: 'Lecture', status: 'completed' },
    { id: 'w3', day: 'WED', time: '11:15 AM', endTime: '12:15 PM', subject: 'DAA Tutorial (Complexities)', subjectCode: 'BTCS-402', room: 'Rm 402', block: 'Block 3', instructor: 'Prof. Hardeep Singh', type: 'Tutorial', status: 'completed' },
    { id: 'w4', day: 'WED', time: '02:00 PM', endTime: '04:00 PM', subject: 'DBMS MySQL & Normalization Lab', subjectCode: 'BTCS-407', room: 'Lab 5', block: 'Block 3', instructor: 'Prof. Rajesh Kumar', type: 'Lab', status: 'completed' }
  ],
  THU: [
    { id: 'th1', day: 'THU', time: '09:00 AM', endTime: '10:00 AM', subject: 'Applied Mathematics - I', subjectCode: 'BTAM-101', room: 'Rm 302', block: 'Block 3', instructor: 'Dr. Manjit Singh', type: 'Tutorial', status: 'completed' },
    { id: 'th2', day: 'THU', time: '11:00 AM', endTime: '12:00 PM', subject: 'Foundations of AI & Python', subjectCode: 'BTAI-101', room: 'Rm 302', block: 'Block 3', instructor: 'Ms. Garima Singh Thakur', topic: 'Unit 1 Introduction to AI & Heuristics', type: 'Lecture', status: 'current' },
    { id: 'th3', day: 'THU', time: '01:30 PM', endTime: '03:30 PM', subject: 'AI Python Practical Lab (Batch AIML-1)', subjectCode: 'BTAI-102', room: 'Einstein AI Lab', block: 'Central Computing Center', instructor: 'Ms. Garima Singh Thakur', topic: 'NumPy, Matplotlib & State Space Search', type: 'Lab', status: 'upcoming' },
    { id: 'th4', day: 'THU', time: '03:30 PM', endTime: '04:30 PM', subject: 'Mentorship & Campus Orientation', subjectCode: 'MENT-101', room: 'Einstein Seminar Hall', block: 'Einstein Block', instructor: 'Ms. Garima Singh Thakur', topic: '1st Semester AIML Academic Roadmap', type: 'Seminar', status: 'upcoming' }
  ],
  FRI: [
    { id: 'f1', day: 'FRI', time: '09:00 AM', endTime: '10:00 AM', subject: 'Discrete Mathematics', subjectCode: 'BTAM-401', room: 'Rm 402', block: 'Block 3', instructor: 'Dr. Manjit Singh', type: 'Lecture', status: 'upcoming' },
    { id: 'f2', day: 'FRI', time: '10:00 AM', endTime: '11:00 AM', subject: 'Operating Systems', subjectCode: 'BTCS-401', room: 'Rm 402', block: 'Block 3', instructor: 'Dr. Preetinder Kaur', type: 'Lecture', status: 'upcoming' },
    { id: 'f3', day: 'FRI', time: '11:15 AM', endTime: '01:15 PM', subject: 'Mini Project Evaluation & Review', subjectCode: 'BTCS-408', room: 'Lab 4', block: 'Block 3', instructor: 'Department Committee', type: 'Lab', status: 'upcoming' },
    { id: 'f4', day: 'FRI', time: '02:00 PM', endTime: '03:00 PM', subject: 'Technical Club & Coding Mentorship', subjectCode: 'CLUB-01', room: 'Audi 1', block: 'Block 2', instructor: 'Coding Ninjas CGC Chapter', type: 'Seminar', status: 'upcoming' }
  ]
};

export const NOTES_COLLECTION: NoteFile[] = [
  {
    id: 'note-ai-1',
    title: 'AI: Foundations & Python Programming (2026 Model)',
    description: 'Unit 1 & 2 Handwritten • AI Search Heuristics, A* Algorithm & Python Scripts',
    subjectCategory: 'AI',
    filename: 'AI_Python_Unit1_Heuristics.pdf',
    fileSize: '4.5 MB',
    tag: 'UNIT 1 • 2026 MODEL',
    author: 'Ms. Garima Singh Thakur',
    downloads: 1680,
    isSavedOffline: true,
    contentPreview: `CGC UNIVERSITY MOHALI - DEPARTMENT OF CSE (AIML)
2026 ACADEMIC MODEL REPOSITORY
Subject: Foundations of AI & Python Programming (BTAI-101)
Instructor: Ms. Garima Singh Thakur • Einstein Academic Wing

1. Introduction to Artificial Intelligence & Agents:
- Intelligent Agent: Perception-Action cycle via sensors and actuators.
- Environment Properties: Fully vs Partially Observable, Deterministic vs Stochastic, Episodic vs Sequential, Static vs Dynamic, Discrete vs Continuous.

2. State Space Search & Heuristics:
- Uninformed Search: Breadth-First Search (BFS), Depth-First Search (DFS), Uniform Cost Search (UCS).
- Informed / Heuristic Search: A* Search algorithm using evaluation function f(n) = g(n) + h(n), where g(n) is actual cost from start to n, and h(n) is admissible heuristic estimate to goal.

3. Python for AI:
- NumPy vectorization, array manipulation, and linear algebra dot products.
- Matplotlib plotting of decision boundaries and cost functions.`
  },
  {
    id: 'note-math-1',
    title: 'Applied Mathematics - I: Calculus & Linear Algebra (2026 Model)',
    description: 'Matrices, Eigenvalues, Vector Spaces, Taylor expansions & AI optimization',
    subjectCategory: 'MATHS',
    filename: 'Maths1_Calculus_Cookbook_2026.pdf',
    fileSize: '4.2 MB',
    tag: 'UNIT 1 & 2 • 2026 MODEL',
    author: 'Dr. Manjit Singh',
    downloads: 1240,
    isSavedOffline: true,
    contentPreview: `CGC UNIVERSITY MOHALI - 2026 ACADEMIC REPOSITORY
Subject: Applied Mathematics - I (BTAM-101)
Unit 1 & 2: Matrices, Linear Algebra & Multivariable Calculus

1. Characteristic Equation & Cayley-Hamilton Theorem:
- Every square matrix satisfies its own characteristic equation: det(A - lambda*I) = 0.
- Application in computing matrix powers A^n and inverse A^-1.

2. Eigenvalues & Eigenvectors for AI:
- Principal Component Analysis (PCA) projection relies on covariance matrix eigendecomposition.
- Diagonalization: A = P * D * P^-1 if A possesses n linearly independent eigenvectors.

3. Multivariable Calculus & Gradient Descent:
- Gradient vector grad(f) points in direction of greatest rate of increase.
- Hessian matrix determines convexity in optimization algorithms.`
  },
  {
    id: 'note-phy-1',
    title: 'Engineering Physics & Quantum Basics (2026 Model)',
    description: 'Quantum wave mechanics, Qubits superposition, Band Theory & Hall effect',
    subjectCategory: 'PHYSICS',
    filename: 'Physics_Quantum_Basics_2026.pdf',
    fileSize: '3.9 MB',
    tag: 'CORE • 2026 MODEL',
    author: 'Dr. Ravinder Sharma',
    downloads: 890,
    isSavedOffline: false,
    contentPreview: `CGC UNIVERSITY MOHALI - 2026 MODEL REPOSITORY
Subject: Engineering Physics & Quantum Basics (BTPH-101)
Unit 1: Quantum Mechanics & Qubit Foundations

1. Wave-Particle Duality & De Broglie Hypothesis:
- lambda = h / p = h / (m * v)
- Davisson-Germer electron diffraction validation.

2. Schrodinger Wave Equation:
- Time-independent formulation: (-hbar^2 / 2m) * nabla^2(psi) + V*psi = E*psi.
- Born's statistical interpretation of wave function |psi|^2.

3. Introduction to Quantum Computing Bits:
- Classical bit: {0, 1}; Qubit: |psi> = alpha|0> + beta|1> where |alpha|^2 + |beta|^2 = 1.
- Bloch sphere representation of qubit states.`
  },
  {
    id: 'note-pyq-1',
    title: 'CGC University 2026 Solved Model Papers & Viva Prep',
    description: 'MST 1, MST 2 & Semester End model answers with 2026 grading rubric',
    subjectCategory: 'PYQ',
    filename: 'CGCU_2026_Model_Papers.pdf',
    fileSize: '5.8 MB',
    tag: '2026 MODEL PAPERS',
    author: 'CGC University Academic Council',
    downloads: 3450,
    isSavedOffline: true,
    contentPreview: `CGC UNIVERSITY MOHALI (2026 ACADEMIC MODEL)
Compiled Official Model Papers & Solutions: B.Tech CSE (AIML) Semester 1

Subject 1: Foundations of AI & Python (BTAI-101)
Q1: Explain A* Search admissibility condition and formulate the 8-puzzle Manhattan distance heuristic.
Solution:
A heuristic h(n) is admissible if for all nodes n, 0 <= h(n) <= h*(n).
For the 8-puzzle, Manhattan Distance = sum of absolute horizontal and vertical distances of tiles from goal positions. It never overestimates because every misplaced tile must move at least its Manhattan steps.

Subject 2: Applied Mathematics - I (BTAM-101)
Q2: Verify Cayley-Hamilton Theorem for matrix A = [[2, 1], [1, 2]] and compute A^-1.
Characteristic equation: lambda^2 - 4*lambda + 3 = 0.
A^2 - 4A + 3I = 0 => A^-1 = (4I - A) / 3.`
  },
  {
    id: 'note-lab-1',
    title: 'AI & Python Practical Lab Source Codes (2026 Model)',
    description: 'Jupyter notebooks for State Space Search, 8-Puzzle, NumPy and Matplotlib plots',
    subjectCategory: 'LAB',
    filename: 'AI_Python_Lab_Notebooks_2026.zip',
    fileSize: '6.4 MB',
    tag: 'LAB REPO • 2026 MODEL',
    author: 'Ms. Garima Singh Thakur',
    downloads: 2100,
    isSavedOffline: true,
    contentPreview: `CGC UNIVERSITY MOHALI - EINSTEIN AI LAB
Course Code: BTAI-102 (AI & Python Lab - 2026 Model)
Lab In-charge: Ms. Garima Singh Thakur

Experiment 1: Implement Breadth First Search (BFS) and Depth First Search (DFS) for Water Jug Problem.
Experiment 2: Implement A* algorithm for finding the shortest path on a weighted grid with Euclidean heuristic.
Experiment 3: NumPy tensor operations and vectorized calculation of covariance matrices without loops.
Experiment 4: Matplotlib visualization of 2D classification decision boundaries.`
  },
  {
    id: 'note-os-1',
    title: 'OS: Process Sync & Deadlocks (Reference)',
    description: 'Verified Topper Note • Peterson Algorithm & Bankers Algorithm',
    subjectCategory: 'OS',
    filename: 'OS_Unit3_Semaphores.pdf',
    fileSize: '4.2 MB',
    tag: 'REFERENCE VAULT',
    author: 'Dr. Preetinder Kaur',
    downloads: 1420,
    isSavedOffline: false,
    contentPreview: `CGC UNIVERSITY MOHALI - REFERENCE LIBRARY
Subject: Operating Systems (BTCS-401)
Unit 3: Process Synchronization & Deadlocks`
  },
  {
    id: 'note-daa-1',
    title: 'DAA: Dynamic Programming Sheet (Reference)',
    description: '0/1 Knapsack, LCS, Matrix Chain & Graph • Master Formulas',
    subjectCategory: 'DAA',
    filename: 'DAA_DynamicProgramming.pdf',
    fileSize: '2.8 MB',
    tag: 'REFERENCE VAULT',
    author: 'Prof. Hardeep Singh',
    downloads: 1890,
    isSavedOffline: false,
    contentPreview: `CGC UNIVERSITY MOHALI - DAA TOPPER FORMULA REFERENCE
Unit 4: Dynamic Programming & Optimal Substructure`
  },
  {
    id: 'note-dbms-1',
    title: 'DBMS: SQL & Normalization Revision (Reference)',
    description: 'Quick review cards + 1NF to BCNF charts • Solved queries',
    subjectCategory: 'DBMS',
    filename: 'DBMS_SQL_Normalization.pdf',
    fileSize: '5.1 MB',
    tag: 'REFERENCE VAULT',
    author: 'Prof. Rajesh Kumar',
    downloads: 1150,
    isSavedOffline: false,
    contentPreview: `CGC UNIVERSITY MOHALI - DBMS QUICK VIVA & WRITTEN GUIDE
Unit 2: Relational Schema Design & Normal Forms`
  }
];

export const SYLLABUS_COURSES: SyllabusCourse[] = [
  {
    code: 'BTAI-101',
    name: 'Foundations of AI & Python Programming (2026 Model)',
    credits: 4,
    completionPct: 75,
    units: [
      { unitNumber: 1, title: 'Intelligent Agents & Problem Formulations', topics: ['Agent architectures (PEAS)', 'Environment properties', 'State space graph modeling'], status: 'Completed', completionPct: 100 },
      { unitNumber: 2, title: 'Informed Search & Heuristic Algorithms', topics: ['Uninformed BFS/DFS/UCS', 'A* Search & admissibility proof', 'Greedy Best-First search', 'Game playing Minimax & Alpha-Beta'], status: 'Completed', completionPct: 100 },
      { unitNumber: 3, title: 'Python Vectorized Computing & NumPy', topics: ['NumPy arrays & broadcasting', 'Linear algebra dot products', 'Pandas dataframes', 'Matplotlib visual analytics'], status: 'In Progress', completionPct: 65 },
      { unitNumber: 4, title: 'Introduction to Machine Learning Models', topics: ['Supervised vs Unsupervised', 'Perceptrons & Linear Regression', 'Loss functions & Gradient Descent', 'Model evaluation metrics'], status: 'Pending', completionPct: 0 }
    ]
  },
  {
    code: 'BTAM-101',
    name: 'Applied Mathematics - I: Calculus & Linear Algebra (2026 Model)',
    credits: 4,
    completionPct: 68,
    units: [
      { unitNumber: 1, title: 'Matrices & Systems of Linear Equations', topics: ['Row echelon form & matrix rank', 'Gauss elimination & Gauss-Jordan', 'Consistency of linear systems'], status: 'Completed', completionPct: 100 },
      { unitNumber: 2, title: 'Eigenvalues & Diagonalization for AI', topics: ['Cayley-Hamilton theorem', 'Eigenvalues & Eigenvectors', 'Diagonalization & Quadratic forms'], status: 'Completed', completionPct: 100 },
      { unitNumber: 3, title: 'Differential Calculus & Taylor Series', topics: ['Partial derivatives & Euler theorem', 'Taylor & Maclaurin expansions', 'Maxima & Minima of multivariable functions'], status: 'In Progress', completionPct: 55 },
      { unitNumber: 4, title: 'Vector Spaces & Inner Product Spaces', topics: ['Subspaces, basis & dimension', 'Gram-Schmidt orthogonalization', 'Singular Value Decomposition (SVD) concept'], status: 'Pending', completionPct: 0 }
    ]
  },
  {
    code: 'BTPH-101',
    name: 'Engineering Physics & Quantum Basics (2026 Model)',
    credits: 3,
    completionPct: 60,
    units: [
      { unitNumber: 1, title: 'Quantum Mechanics Foundations', topics: ['Wave-particle duality', 'De Broglie wavelength', 'Heisenberg uncertainty principle', 'Schrodinger wave equation'], status: 'Completed', completionPct: 100 },
      { unitNumber: 2, title: 'Semiconductor Physics & Band Theory', topics: ['Kronig-Penney model', 'Direct & Indirect bandgap semiconductors', 'Carrier concentration & Fermi level', 'Hall effect & applications'], status: 'Completed', completionPct: 100 },
      { unitNumber: 3, title: 'Optoelectronics & Fiber Optics', topics: ['Einstein coefficients', 'Ruby & He-Ne lasers', 'Numerical aperture & fiber modes', 'Optical communication link'], status: 'In Progress', completionPct: 40 },
      { unitNumber: 4, title: 'Quantum Computing Hardware Basics', topics: ['Qubit state representation', 'Bloch sphere geometry', 'Quantum logic gates (X, H, CNOT)', 'Superconducting qubit intro'], status: 'Pending', completionPct: 0 }
    ]
  }
];

export const NOTICES_LIST: NoticeItem[] = [
  {
    id: 'n1',
    title: 'Mid Semester Examination (MST-1) 2026 Date Sheet Released',
    description: 'Mid Semester Examinations (MST-1) 2026 commence from Oct 14th across all engineering wings. Block 3 designated for CSE & AIML students. Seating charts and digital hall tickets will be visible on portal 48 hours prior.',
    category: 'Exam',
    date: 'Yesterday',
    refNo: 'CGCU/EXAM/26/109',
    attachmentName: 'MST1_Datesheet_CGCU_2026.pdf',
    isRead: false,
    priority: 'high'
  },
  {
    id: 'n2',
    title: 'Amazon, Google & Microsoft Pre-Placement Hackathon 2026',
    description: 'Corporate Resource Centre (CRC Mohali) announces national AI hackathon and coding sprint. Mandatory orientation session for First Semester B.Tech AIML students in Einstein Seminar Hall on Saturday 10:00 AM.',
    category: 'Placement',
    date: '3 days ago',
    refNo: 'CGCU/CRC/26/048',
    attachmentName: 'Amazon_AI_Hackathon_2026.pdf',
    isRead: false,
    priority: 'high'
  },
  {
    id: 'n3',
    title: 'Parivartan 2026 National Tech-Cultural Fest Registrations Open',
    description: 'Annual National Tech Fest Parivartan 2026 begins next month! Join student organizing committees for AI Hackathons, RoboWars, Drone Racing, and Stage Management.',
    category: 'Clubs',
    date: '5 days ago',
    refNo: 'CGCU/CLUBS/26/014',
    attachmentName: 'Parivartan_Rulebook_2026.pdf',
    isRead: true,
    priority: 'normal'
  },
  {
    id: 'n4',
    title: 'Academic Mobility: NEP 2026 DigiLocker ABC Credit Transfer Form',
    description: 'Dean Academics notification for students under the 2026 Academic Model opting for NPTEL/SWAYAM credit transfers or campus semester exchange. Last date of credit mapping submission is Oct 25th.',
    category: 'Academic',
    date: '1 week ago',
    refNo: 'CGCU/ACAD/26/082',
    attachmentName: 'NEP_Credit_Transfer_Form_2026.pdf',
    isRead: true,
    priority: 'normal'
  }
];

export const CAMPUS_DIRECTORY = [
  {
    id: 'c1',
    name: 'Block 3 - Computer Science Engineering',
    category: 'Academic Wing',
    campus: 'Landran Campus',
    floors: 'Ground to 4th Floor',
    description: 'Dean Office: Ground Floor • HOD CSE Room 102 • Advanced AI & Cloud Labs: 3rd & 4th Floor',
    phone: '+91 172-3984200 (Ext 104)',
    email: 'cse.desk@cgc.edu.in',
    icon: 'apartment'
  },
  {
    id: 'c2',
    name: 'Central Knowledge Resource Library',
    category: 'Library & E-Resources',
    campus: 'Landran Campus',
    floors: '3-Story Central Facility',
    description: 'Timings: Mon-Sat 08:00 AM - 09:00 PM • Digital Research Lab 24/7 • Over 120,000+ Printed & IEEE E-Journals',
    phone: '+91 172-3984215',
    email: 'library@cgc.edu.in',
    icon: 'menu_book'
  },
  {
    id: 'c3',
    name: 'Transport & Campus Bus Fleet Desk',
    category: 'Student Services',
    campus: 'Mohali Quad',
    floors: 'Gate #2 Transit Hub',
    description: 'Fleet of 85+ AC Buses connecting Chandigarh, Mohali, Panchkula, Kharar, Ropar & Ambala.',
    phone: '+91 172-3984250',
    email: 'transport@cgc.edu.in',
    icon: 'directions_bus',
    pdfFile: 'CGC_Mohali_Bus_Routes_2024.pdf'
  },
  {
    id: 'c4',
    name: 'Campus Dispensary & 24x7 Ambulance',
    category: 'Healthcare & Emergency',
    campus: 'Landran & Jhanjeri',
    floors: 'Adjacent to Hostel Gate 1',
    description: 'Resident Medical Officer, qualified nursing staff, basic pathology & on-call emergency ambulance response.',
    phone: '+91 172-3984299',
    email: 'medical@cgc.edu.in',
    icon: 'medical_services'
  },
  {
    id: 'c5',
    name: 'Corporate Resource Centre (CRC)',
    category: 'Placements & Training',
    campus: 'Landran Campus',
    floors: 'Block 1 • 2nd Floor',
    description: 'Coordinates campus drives, hackathons, pre-placement interviews and Fortune 500 employer engagements.',
    phone: '+91 172-3984277',
    email: 'placements@cgc.edu.in',
    icon: 'work'
  },
  {
    id: 'c6',
    name: 'Einstein Hostel Residence Complex',
    category: 'Hostel & Residential',
    campus: 'CGC University Mohali (Inside Campus)',
    floors: 'Blocks A, B & C • Study Lounges & High-Speed Wi-Fi',
    description: 'Inside campus residential hostel with 24x7 security, biometric entry, silent study rooms, gym, and resident tutor desk.',
    phone: '+91 172-3984266',
    email: 'hostel.einstein@cgc.edu.in',
    icon: 'hotel'
  }
];

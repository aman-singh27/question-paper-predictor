// Branch → Year → Subjects hierarchy for college exam platform

export const branches = [
    {
        id: 'cse',
        name: 'Computer Science & Engineering',
        code: 'CSE',
        description: 'Core computer science and software engineering',
    },
    {
        id: 'ece',
        name: 'Electronics & Communication',
        code: 'ECE',
        description: 'Coming Soon',
        comingSoon: true,
    },
    {
        id: 'me',
        name: 'Mechanical Engineering',
        code: 'ME',
        description: 'Coming Soon',
        comingSoon: true,
    },
    {
        id: 'ce',
        name: 'Civil Engineering',
        code: 'CE',
        description: 'Coming Soon',
        comingSoon: true,
    },
];

export const yearsByBranch: Record<string, any[]> = {
    cse: [
        {
            id: 'year-1',
            name: 'Year 1',
            subtitle: 'Foundation (Common for all branches)',
            description: 'Engineering fundamentals and basic sciences',
        },
        {
            id: 'year-2',
            name: 'Year 2',
            subtitle: 'Core Computer Science Basics',
            description: 'Data structures, programming, and core CS concepts',
        },
        {
            id: 'year-3',
            name: 'Year 3',
            subtitle: 'Advanced & Applied Computer Science',
            description: 'Networks, compilers, and specialized topics',
        },
        {
            id: 'year-4',
            name: 'Year 4',
            subtitle: 'Specialization & Industry Focus',
            description: 'Advanced electives and capstone projects',
        },
    ],
};

export const subjectsByYear: Record<string, any[]> = {
    'year-1': [
        { id: 'engg-math-1', name: 'Engineering Mathematics I', status: 'coming-soon', category: 'Core' },
        { id: 'engg-math-2', name: 'Engineering Mathematics II', status: 'coming-soon', category: 'Core' },
        { id: 'engg-physics', name: 'Engineering Physics', status: 'coming-soon', category: 'Core' },
        { id: 'engg-chemistry', name: 'Engineering Chemistry', status: 'coming-soon', category: 'Core' },
        { id: 'programming', name: 'Programming for Problem Solving', status: 'coming-soon', category: 'Core' },
        { id: 'bee', name: 'Basic Electrical & Electronics', status: 'coming-soon', category: 'Core' },
        { id: 'engg-mechanics', name: 'Engineering Mechanics', status: 'coming-soon', category: 'Core' },
        { id: 'engg-graphics', name: 'Engineering Graphics', status: 'coming-soon', category: 'Skill' },
        { id: 'comm-skills', name: 'Communication Skills', status: 'coming-soon', category: 'Skill' },
        { id: 'env-studies', name: 'Environmental Studies', status: 'coming-soon', category: 'Skill' },
        { id: 'workshop', name: 'Workshop Practices', status: 'coming-soon', category: 'Skill' },
    ],
    'year-2': [
        { id: 'discrete-math', name: 'Discrete Mathematics', status: 'coming-soon', category: 'Mathematics' },
        { id: 'probability-stats', name: 'Probability & Statistics', status: 'coming-soon', category: 'Mathematics' },
        { id: 'data-structures', name: 'Data Structures & Algorithms', status: 'ready', paperCount: 8, category: 'Core CS' },
        { id: 'oop', name: 'Object-Oriented Programming', status: 'coming-soon', category: 'Core CS' },
        { id: 'digital-logic', name: 'Digital Logic & Computer Organization', status: 'coming-soon', category: 'Core CS' },
        { id: 'operating-systems', name: 'Operating Systems', status: 'ready', paperCount: 5, category: 'Core CS' },
        { id: 'database-management', name: 'Database Management Systems', status: 'ready', paperCount: 7, category: 'Core CS' },
    ],
    'year-3': [
        { id: 'computer-networks', name: 'Computer Networks', status: 'ready', paperCount: 2, category: 'Core' },
        { id: 'theory-computation', name: 'Theory of Computation', status: 'coming-soon', category: 'Core' },
        { id: 'compiler-design', name: 'Compiler Design', status: 'coming-soon', category: 'Core' },
        { id: 'software-engineering', name: 'Software Engineering', status: 'ready', paperCount: 4, category: 'Core' },
        { id: 'daa', name: 'Design & Analysis of Algorithms', status: 'coming-soon', category: 'Core' },
        { id: 'web-tech', name: 'Web Technologies', status: 'coming-soon', category: 'Core' },
        { id: 'ai', name: 'Artificial Intelligence', status: 'coming-soon', category: 'Elective' },
        { id: 'ml', name: 'Machine Learning', status: 'coming-soon', category: 'Elective' },
        { id: 'data-science', name: 'Data Science', status: 'coming-soon', category: 'Elective' },
        { id: 'cloud-computing', name: 'Cloud Computing', status: 'coming-soon', category: 'Elective' },
        { id: 'cyber-security', name: 'Cyber Security', status: 'coming-soon', category: 'Elective' },
    ],
    'year-4': [
        { id: 'deep-learning', name: 'Deep Learning', status: 'coming-soon', category: 'Elective' },
        { id: 'big-data', name: 'Big Data Analytics', status: 'coming-soon', category: 'Elective' },
        { id: 'blockchain', name: 'Blockchain Technology', status: 'coming-soon', category: 'Elective' },
        { id: 'iot', name: 'Internet of Things', status: 'coming-soon', category: 'Elective' },
        { id: 'distributed-systems', name: 'Distributed Systems', status: 'coming-soon', category: 'Elective' },
        { id: 'mobile-dev', name: 'Mobile Application Development', status: 'coming-soon', category: 'Elective' },
        { id: 'adv-cyber', name: 'Advanced Cyber Security', status: 'coming-soon', category: 'Elective' },
        { id: 'capstone', name: 'Capstone Project', status: 'coming-soon', category: 'Mandatory' },
        { id: 'internship', name: 'Industrial Training', status: 'coming-soon', category: 'Mandatory' },
    ],
};

// Update mock subjects to match the new IDs
export const mockSubjects = [
    {
        subjectId: 'operating-systems',
        subject: 'Operating Systems',
        paperCount: 5,
        status: 'ready',
    },
    {
        subjectId: 'computer-networks',
        subject: 'Computer Networks',
        paperCount: 2,
        status: 'bootstrapping',
    },
    {
        subjectId: 'database-management',
        subject: 'Database Management Systems',
        paperCount: 7,
        status: 'ready',
    },
    {
        subjectId: 'data-structures',
        subject: 'Data Structures & Algorithms',
        paperCount: 8,
        status: 'ready',
    },
    {
        subjectId: 'software-engineering',
        subject: 'Software Engineering',
        paperCount: 4,
        status: 'bootstrapping',
    },
    {
        subjectId: 'computer-architecture',
        subject: 'Computer Architecture',
        paperCount: 6,
        status: 'ready',
    },
];

// Keep existing insights data
export const mockSubjectInsights: Record<string, any> = {
    'operating-systems': {
        subject: 'Operating Systems',
        paperCount: 5,
        computedAt: new Date('2024-01-15'),
        mostAskedTopic: {
            byCount: 'Memory Management',
            byMarks: 'Memory Management',
        },
        topicWeightage: {
            'Memory Management': 32,
            'Process Scheduling': 24,
            'Deadlocks': 18,
            'File Systems': 14,
            'CPU Scheduling': 12,
        },
        questionTypeDistribution: {
            Subjective: 68,
            Numerical: 27,
            MCQ: 5,
        },
        topicQuestionTypeMap: {
            'Memory Management': 'Subjective',
            'Deadlocks': 'Numerical',
            'CPU Scheduling': 'Numerical',
        },
        yearlyTrends: {
            '2022': ['Memory Management', 'Deadlocks'],
            '2023': ['Process Scheduling'],
            '2024': ['Memory Management'],
        },
        frequentlyAskedQuestions: [
            "Explain the concept of virtual memory and demand paging with diagrams.",
            "What is a deadlock? Explain the four necessary conditions for deadlock occurrence.",
            "Differentiate between Preemptive and Non-preemptive scheduling algorithms.",
            "Explain the critical section problem and Peterson's solution.",
            "Describe the different states of a process with a state transition diagram.",
            "Compare and contrast Paging and Segmentation memory management techniques.",
            "What is Thrashing? What are its causes and how can it be prevented?",
            "Explain the Banker's Algorithm for deadlock avoidance with an example."
        ],
    },
    'computer-networks': {
        subject: 'Computer Networks',
        paperCount: 2,
        computedAt: new Date('2024-01-15'),
        mostAskedTopic: {
            byCount: 'Data Link Layer',
            byMarks: 'Data Link Layer',
        },
        topicWeightage: {
            'Data Link Layer': 40,
            'Network Layer': 35,
            'Transport Layer': 25,
        },
        questionTypeDistribution: {
            Subjective: 80,
            Numerical: 20,
            MCQ: 0,
        },
        topicQuestionTypeMap: {
            'Data Link Layer': 'Subjective',
        },
        yearlyTrends: {
            '2023': ['Data Link Layer'],
        },
        frequentlyAskedQuestions: [
            "Explain the OSI reference model with functions of each layer.",
            "What is the difference between TCP and UDP? When should each be used?",
            "Explain the sliding window protocol for flow control.",
            "Describe the process of IP addressing and Subnetting with examples.",
            "What is congestion control? Explain the Leaky Bucket and Token Bucket algorithms.",
            "Explain the mechanism of ARP and RARP protocols.",
            "Differentiate between Circuit Switching and Packet Switching.",
            "What is DNS? Explain the hierarchy of domain name space."
        ],
    },
    'database-management': {
        subject: 'Database Management Systems',
        paperCount: 7,
        computedAt: new Date('2024-01-15'),
        mostAskedTopic: {
            byCount: 'SQL Queries',
            byMarks: 'Normalization',
        },
        topicWeightage: {
            'SQL Queries': 28,
            'Normalization': 25,
            'Transactions': 20,
            'Indexing': 15,
            'ER Diagrams': 12,
        },
        questionTypeDistribution: {
            Subjective: 55,
            Numerical: 30,
            MCQ: 15,
        },
        topicQuestionTypeMap: {
            'SQL Queries': 'Subjective',
            'Normalization': 'Subjective',
            'Transactions': 'Numerical',
        },
        yearlyTrends: {
            '2022': ['SQL Queries', 'ER Diagrams'],
            '2023': ['Normalization', 'Transactions'],
            '2024': ['SQL Queries', 'Indexing'],
        },
        frequentlyAskedQuestions: [
            "What is Normalization? Explain 1NF, 2NF, 3NF, and BCNF with examples.",
            "Explain the ACID properties of a database transaction in detail.",
            "Differentiate between Relational Algebra and Relational Calculus.",
            "What is an ER diagram? Draw an ER diagram for a Library Management System.",
            "Explain the difference between Primary Key, Foreign Key, and Candidate Key.",
            "What is Indexing? Explain B-Trees and B+ Trees.",
            "Describe the different types of Joins in SQL with examples.",
            "Explain the Two-Phase Locking (2PL) protocol for concurrency control."
        ],
    },
    'data-structures': {
        subject: 'Data Structures & Algorithms',
        paperCount: 8,
        computedAt: new Date('2024-01-15'),
        mostAskedTopic: {
            byCount: 'Trees',
            byMarks: 'Dynamic Programming',
        },
        topicWeightage: {
            'Trees': 22,
            'Dynamic Programming': 20,
            'Graphs': 18,
            'Sorting Algorithms': 16,
            'Linked Lists': 12,
            'Hashing': 12,
        },
        questionTypeDistribution: {
            Subjective: 45,
            Numerical: 40,
            MCQ: 15,
        },
        topicQuestionTypeMap: {
            'Trees': 'Subjective',
            'Dynamic Programming': 'Numerical',
            'Graphs': 'Subjective',
        },
        yearlyTrends: {
            '2022': ['Trees', 'Sorting Algorithms'],
            '2023': ['Dynamic Programming', 'Graphs'],
            '2024': ['Trees', 'Hashing'],
        },
        frequentlyAskedQuestions: [
            "Explain the Quick Sort algorithm. Derive its time complexity.",
            "What is a Binary Search Tree (BST)? Explain insertion and deletion operations.",
            "Differentiate between DFS and BFS traversal with algorithms.",
            "Explain the concept of Dynamic Programming with the 0/1 Knapsack problem.",
            "What is a Hash Table? Explain collision resolution techniques.",
            "Explain Dijkstra's algorithm for finding the shortest path in a graph.",
            "What is a Stack? Explain its applications and implementation using arrays.",
            "Explain the Heap Sort algorithm and heapify process."
        ],
    },
    'software-engineering': {
        subject: 'Software Engineering',
        paperCount: 4,
        computedAt: new Date('2024-01-15'),
        mostAskedTopic: {
            byCount: 'SDLC Models',
            byMarks: 'Design Patterns',
        },
        topicWeightage: {
            'SDLC Models': 30,
            'Design Patterns': 25,
            'Testing': 20,
            'UML Diagrams': 15,
            'Project Management': 10,
        },
        questionTypeDistribution: {
            Subjective: 70,
            Numerical: 10,
            MCQ: 20,
        },
        topicQuestionTypeMap: {
            'SDLC Models': 'Subjective',
            'Design Patterns': 'Subjective',
        },
        yearlyTrends: {
            '2023': ['SDLC Models', 'Testing'],
            '2024': ['Design Patterns'],
        },
        frequentlyAskedQuestions: [
            "Compare and contrast the Waterfall Model and the Agile Model.",
            "What is Software Testing? Differentiate between Black-box and White-box testing.",
            "Explain the Singleton and Factory Design Patterns with code examples.",
            "What is Requirement Engineering? Explain the steps involved.",
            "Explain the concept of Coupling and Cohesion in software design.",
            "What is a Use Case Diagram? Draw a use case diagram for an ATM system.",
            "Explain the role of a Software Project Manager.",
            "What is Maintenance? Explain the different types of software maintenance."
        ],
    },
    'computer-architecture': {
        subject: 'Computer Architecture',
        paperCount: 6,
        computedAt: new Date('2024-01-15'),
        mostAskedTopic: {
            byCount: 'Pipelining',
            byMarks: 'Cache Memory',
        },
        topicWeightage: {
            'Pipelining': 26,
            'Cache Memory': 24,
            'Instruction Set': 20,
            'Memory Hierarchy': 18,
            'I/O Organization': 12,
        },
        questionTypeDistribution: {
            Subjective: 50,
            Numerical: 40,
            MCQ: 10,
        },
        topicQuestionTypeMap: {
            'Pipelining': 'Numerical',
            'Cache Memory': 'Numerical',
            'Instruction Set': 'Subjective',
        },
        yearlyTrends: {
            '2022': ['Pipelining', 'I/O Organization'],
            '2023': ['Cache Memory', 'Memory Hierarchy'],
            '2024': ['Pipelining', 'Instruction Set'],
        },
        frequentlyAskedQuestions: [
            "What is Pipelining? Explain the hazards in pipelining.",
            "Explain the concept of Cache Memory and different mapping techniques.",
            "Differentiate between RISC and CISC architectures.",
            "Explain the Von Neumann architecture with a block diagram.",
            "What is Direct Memory Access (DMA)? Explain its working.",
            "Explain the differnet addressing modes with examples.",
            "What is an Instruction Set? Explain the instruction execution cycle.",
            "Explain the Booth's Multiplication Algorithm."
        ],
    },
};

export const mockContributions = [
    {
        id: '1',
        subject: 'Operating Systems',
        examYear: '2024',
        status: 'processed',
        uploadedAt: new Date('2024-01-10'),
    },
    {
        id: '2',
        subject: 'Computer Networks',
        examYear: '2023',
        status: 'processed',
        uploadedAt: new Date('2024-01-12'),
    },
    {
        id: '3',
        subject: 'Database Management Systems',
        examYear: '2024',
        status: 'processing',
        uploadedAt: new Date('2024-01-14'),
    },
];

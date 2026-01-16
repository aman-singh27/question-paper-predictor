// Enhanced paper generation matching actual university exam format (MTE & ETE)

export function generateUniversityPaper(
    subject: string,
    insights: any,
    paperType: 'MTE' | 'ETE' = 'MTE'
): any {
    const currentDate = new Date();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();
    const semester = 'V'; // Defaulting to V for now as per context

    const isMTE = paperType === 'MTE';
    const totalMarks = isMTE ? 30 : 80;
    const duration = isMTE ? '1.5 hrs' : '03 hrs';

    return {
        header: {
            university: 'Faculty of Engineering, School of Computer Science and Engineering',
            department: 'Department of Artificial Intelligence and Machine Learning',
            program: 'B. Tech-CSE (AIML)',
            courseCode: generateCourseCode(subject),
            courseName: subject,
            semester: semester,
            examTitle: `${isMTE ? 'Mid Term' : 'End Term'} Examination, ${month} ${year}`,
            duration: duration,
            maxMarks: totalMarks,
        },
        instructions: [
            'All questions are compulsory.',
            'Missing data, if any, may be assumed suitably.',
            'Scientific Calculator is allowed.',
        ],
        sections: isMTE
            ? {
                // MTE Structure (30 Marks)
                sectionA: generateSectionA_MTE(subject, insights),
                sectionB: generateSectionB_MTE(subject, insights),
                sectionC: generateSectionC_MTE(subject, insights),
            }
            : {
                // ETE Structure (80 Marks)
                sectionA: generateSectionA_ETE(subject, insights),
                sectionB: generateSectionB_ETE(subject, insights),
                sectionC: generateSectionC_ETE(subject, insights),
                sectionD: generateSectionD_ETE(subject, insights),
            },
        paperType: paperType,
        generatedAt: new Date(),
    };
}

function generateCourseCode(subject: string): string {
    const codes: Record<string, string> = {
        'Computer Networks': 'AIM3120',
        'Operating Systems': 'CSE3010',
        'Database Management Systems': 'CSE3020',
        'Data Structures & Algorithms': 'CSE2010',
        'Software Engineering': 'CSE4010',
    };
    return codes[subject] || 'Al-3104';
}

// --- MTE GENERATORS (Original 30 Marks) ---

function generateSectionA_MTE(subject: string, _insights: any) {
    return {
        title: 'SECTION A (Memory Based Questions)',
        subtitle: '(20-30 words Answers)',
        questions: [
            {
                number: 'A1',
                parts: [{ text: `Match the following terms related to ${subject.toLowerCase()} with their descriptions:`, type: 'matching', marks: '0.5*4' }],
                totalMarks: 2,
                co: 'CO1',
            },
            {
                number: 'A2',
                parts: [{ text: getShortAnswerQuestion(subject, 1), marks: '1*2' }],
                totalMarks: 2,
                co: 'CO2',
            },
            {
                number: 'A3',
                parts: [{ text: getShortAnswerQuestion(subject, 2), marks: '1*2' }],
                totalMarks: 2,
                co: 'CO1',
            },
        ],
        maxMarks: 6,
    };
}

function generateSectionB_MTE(subject: string, _insights: any) {
    return {
        title: 'SECTION B (Concept Based Questions)',
        subtitle: '(Maximum 150-200 Words Answers)',
        questions: [
            { number: 'B1', parts: [{ text: getConceptQuestion(subject, 1), subparts: ['(i) Calculate the required parameter.', '(ii) Compare with theoretical limits.'], marks: '2+2' }], totalMarks: 4, co: 'CO2' },
            { number: 'B2', parts: [{ text: getConceptQuestion(subject, 2), marks: '1*4' }], totalMarks: 4, co: 'CO1' },
            { number: 'B3', parts: [{ text: getConceptQuestion(subject, 3), subparts: ['I. Compute the required bits.', 'II. Verify the result.'], marks: '2+2' }], totalMarks: 4, co: 'CO2' },
            { number: 'B4', parts: [{ text: getConceptQuestion(subject, 4), subparts: ['(i) Calculate the minimum requirement.', '(ii) Explain the necessity.'], marks: '2+2' }], totalMarks: 4, co: 'CO2' },
        ],
        maxMarks: 16,
    };
}

function generateSectionC_MTE(subject: string, _insights: any) {
    return {
        title: 'SECTION-C (Analytical Based Questions)',
        subtitle: '(Maximum 300-350 words Answers)',
        questions: [
            {
                number: 'C1',
                parts: [
                    { label: 'A)', text: getAnalyticalQuestion(subject, 1), subparts: ['I. Construct the complete solution.', 'II. Show error detection and correction.'], marks: '2+2' },
                    { label: 'B)', text: getAnalyticalQuestion(subject, 2), subparts: ['I. Calculate the utilization.', 'II. Compare different protocols and analyze.'], marks: '2+2' },
                ],
                totalMarks: 8,
                co: 'CO2',
            },
        ],
        maxMarks: 8,
    };
}

// --- ETE GENERATORS (New 80 Marks) ---

function generateSectionA_ETE(subject: string, _insights: any) {
    // 5 Questions x 2 Marks = 10 Marks
    const questions = [];
    for (let i = 1; i <= 5; i++) {
        questions.push({
            number: `Q${i}`,
            parts: [{ text: getShortAnswerQuestion(subject, i + 3), marks: '2' }], // Offset index to get varied questions
            totalMarks: 2,
            co: i % 2 === 0 ? 'CO2' : 'CO1',
        });
    }
    return {
        title: 'SECTION A (Memory Based Questions)',
        subtitle: '',
        questions: questions,
        maxMarks: 10,
    };
}

function generateSectionB_ETE(subject: string, _insights: any) {
    // 5 Questions x 6 Marks = 30 Marks
    const questions = [];
    for (let i = 6; i <= 10; i++) { // Q6 to Q10
        questions.push({
            number: `Q${i}`,
            parts: [{ text: getConceptQuestion(subject, i - 1), marks: '6' }],
            totalMarks: 6,
            co: 'CO3', // As per sample
        });
    }
    return {
        title: 'SECTION B (Concept Based Questions)',
        subtitle: '',
        questions: questions,
        maxMarks: 30,
    };
}

function generateSectionC_ETE(subject: string, _insights: any) {
    // 2 Questions x 10 Marks = 20 Marks (Analytical)
    return {
        title: 'SECTION-C (Analytical Based Questions)',
        subtitle: '',
        questions: [
            {
                number: 'Q11',
                parts: [{ text: getAnalyticalQuestion(subject, 1), marks: '10' }],
                totalMarks: 10,
                co: 'CO4',
            },
            {
                number: 'Q12',
                parts: [{ text: getAnalyticalQuestion(subject, 2), marks: '10' }],
                totalMarks: 10,
                co: 'CO4',
            },
        ],
        maxMarks: 20,
    };
}

function generateSectionD_ETE(subject: string, _insights: any) {
    // 2 Questions x 10 Marks = 20 Marks (Case Study)
    return {
        title: 'SECTION-D (Case Study/Application based Question)',
        subtitle: '',
        questions: [
            {
                number: 'Q13',
                parts: [{ text: getCaseStudyQuestion(subject, 1), marks: '10' }],
                totalMarks: 10,
                co: 'CO5',
            },
            {
                number: 'Q14',
                parts: [{ text: getCaseStudyQuestion(subject, 2), marks: '10' }],
                totalMarks: 10,
                co: 'CO5',
            },
        ],
        maxMarks: 20,
    };
}

// --- QUESTION BANKS ---

function getShortAnswerQuestion(subject: string, index: number): string {
    const questions: Record<string, string[]> = {
        'Computer Networks': [
            'Define channel capacity.', 'What is the Hamming distance?', 'Define circuit switching.', 'What is a collision domain?', 'Define propagation delay.', 'What is the purpose of the NAV vector?', 'Define multiplexing.',
        ],
        'Operating Systems': [
            'Define a process.', 'What is a semaphore?', 'Define throughput.', 'What is a deadlock?', 'Define paging.', 'What is thrashing?', 'Define a thread.',
        ],
        'Database Management Systems': [
            'Define a primary key.', 'What is a foreign key?', 'Define normalization.', 'What is ACID?', 'Define a transaction.', 'What is concurrency?', 'Define hashing.',
        ],
    };
    const list = questions[subject] || ['Define confidence intervals.', 'Define the Chi-Square test.', 'How does a confusion matrix evaluate model performance?', 'What is market basket analysis?', 'What insights can be gained from a boxplot?'];
    return list[index % list.length];
}

function getConceptQuestion(subject: string, index: number): string {
    const questions: Record<string, string[]> = {
        'Computer Networks': [
            'Compare and contrast Go-Back-N and Selective Repeat protocols.',
            'Evaluate the use of CSMA/CD in Ethernet. What are its limitations?',
            'Evaluate the impact of frame size on network efficiency.',
            'Analyze the role of sliding window protocol in flow control.',
            'Compare circuit switching and packet switching.',
        ],
        'Operating Systems': [
            'Compare and contrast preemptive and non-preemptive scheduling.',
            'Evaluate the use of Semaphores in process synchronization.',
            'Analyze the Banker\'s algorithm for deadlock avoidance.',
            'Evaluate the impact of page size on internal fragmentation.',
            'Compare Paging and Segmentation memory management techniques.',
        ],
    };
    const list = questions[subject] || [
        'Compare and contrast estimates of location and estimates of variability.',
        'Evaluate the use of ANOVA in comparing multiple groups.',
        'Evaluate the impact of the rare class problem on model performance.',
        'Evaluate the role of association analysis in market basket analysis.',
        'Analyze the use of scatter plots and bar graphs in visualizing relationships.',
    ];
    return list[index % list.length];
}

function getAnalyticalQuestion(subject: string, index: number): string {
    const questions: Record<string, string[]> = {
        'Computer Networks': [
            'A channel has 1 Mbps bandwidth and 20ms delay. Calculate the window size for 100% utilization.',
            'Apply CRC algorithm for data 101101 and divisor 1101. Check for errors if received frame is 101101000.',
        ],
        'Operating Systems': [
            'Given processes P1-P4 with burst times 5, 3, 8, 6. Calculate Average Waiting Time using SJF.',
            'Consider reference string 7,0,1,2,0,3,0,4... Calculate page faults using LRU with 3 frames.',
        ],
    };
    const list = questions[subject] || [
        'A soft drink company claims average soda is 500ml. Sample of 25 bottles has mean 495ml (SD=10). Test at 5% significance.',
        'Four brands of batteries compared. 20 flashlights randomly assigned. Test difference in mean lifetime (ANOVA).',
    ];
    return list[index % list.length];
}

function getCaseStudyQuestion(subject: string, index: number): string {
    const questions: Record<string, string[]> = {
        'Computer Networks': [
            'Design a subnet mask for a company requiring 50 subnets with 1000 hosts each. Show calculations.',
            'Analyze a scenario where a network suffers from congestion. Propose mechanisms to control it using TCP.',
        ],
        'Operating Systems': [
            'Given a snapshot of a system with Resource Allocation Graph, determine if there is a deadlock. Justify.',
            'Design a file system layout for a multimedia server. optimize for large sequential reads.',
        ],
    };
    const list = questions[subject] || [
        'Given dataset points A(1,2), B(2,2), C(3,3)... Perform hierarchical clustering using average linkage.',
        'Given transaction ID 1-6 with items (Apple, Banana...). Identify top 3 association rules using Apriori (Support 0.3, Conf 0.7).',
    ];
    return list[index % list.length];
}

export function generateUniversityPaperHTML(paper: any): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <title>${paper.header.courseName} - ${paper.header.examTitle}</title>
    <style>
        @page {
            size: A4;
            margin: 20mm;
        }
        body {
            font-family: "Times New Roman", Times, serif;
            font-size: 11pt;
            line-height: 1.3;
            color: #000;
            max-width: 210mm;
            margin: 0 auto;
            background: white;
            padding: 20px;
        }
        .header-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 5px;
        }
        .header-table td {
            padding: 2px 0;
            vertical-align: top;
        }
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .font-bold { font-weight: bold; }
        .uppercase { text-transform: uppercase; }
        
        .university-header {
            text-align: center;
            font-weight: bold;
            margin-bottom: 20px;
            font-size: 11pt;
            line-height: 1.4;
        }
        
        .exam-meta-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
            font-weight: bold;
        }
        .exam-meta-table td {
            padding: 4px 0;
            vertical-align: top;
        }
        
        .instructions {
            margin-bottom: 20px;
            padding-left: 0;
            font-size: 10pt;
        }
        .instructions div { margin-bottom: 2px; }
        
        .section-header {
            text-align: center;
            font-weight: bold;
            margin-top: 20px;
            margin-bottom: 5px;
            text-transform: uppercase;
        }
        .section-subtitle {
            text-align: center;
            font-weight: normal;
            font-size: 10pt;
            margin-bottom: 15px;
            text-transform: none;
        }
        
        .question-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 10px;
        }
        .question-table th {
            text-align: left;
            border-bottom: 1px solid #000;
            padding: 5px;
            font-weight: bold;
            vertical-align: bottom;
        }
        .question-table td {
            padding: 8px 5px;
            vertical-align: top;
        }
        
        .col-sno { width: 50px; }
        .col-marks { width: 80px; text-align: center; }
        .col-co { width: 40px; text-align: right; }
        
        .sub-question {
            margin-left: 20px;
            margin-top: 5px;
            display: block;
        }
        
        /* Print optimizations */
        @media print {
            body { 
                width: 100%;
                margin: 0;
                padding: 0;
            }
            .no-print { display: none; }
        }
    </style>
</head>
<body onload="window.print()">
    <!-- University Header -->
    <div class="university-header">
        <div>${paper.header.examTitle}</div>
        <div>${paper.header.university}</div>
        <div>${paper.header.department}</div>
        <div>${paper.header.program}</div>
        <div style="margin-top: 10px;">
            Course Code: ${paper.header.courseCode} <br>
            Course: ${paper.header.courseName} <br>
            Semester: ${paper.header.semester}
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 10px; border-bottom: 1px solid black; padding-bottom: 5px;">
            <span>Time: ${paper.header.duration}</span>
            <span>Max. Marks: ${paper.header.maxMarks}</span>
        </div>
    </div>

    <!-- Instructions -->
    <div class="instructions">
        <strong>Instructions:</strong>
        ${paper.instructions.map((inst: string) => `<div>${inst}</div>`).join('')}
    </div>

    <!-- Section A -->
    ${paper.sections.sectionA ? renderSection(paper.sections.sectionA) : ''}

    <!-- Section B -->
    ${paper.sections.sectionB ? renderSection(paper.sections.sectionB) : ''}

    <!-- Section C -->
    ${paper.sections.sectionC ? renderSection(paper.sections.sectionC) : ''}

    <!-- Section D (ETE Only) -->
    ${paper.sections.sectionD ? renderSection(paper.sections.sectionD) : ''}
    
    <div style="text-align: center; margin-top: 30px;">******</div>
</body>
</html>
    `;
}

function renderSection(section: any): string {
    return `
    <div class="section-header">
        ${section.title}
        ${section.subtitle ? `<div class="section-subtitle">${section.subtitle}</div>` : ''}
    </div>
    
    <table class="question-table">
        <thead>
            <tr>
                <th class="col-sno">S.No.</th>
                <th></th>
                <th class="col-marks">Marks</th>
                <th class="col-co">CO</th>
            </tr>
        </thead>
        <tbody>
            ${section.questions.map((q: any) => `
                <tr>
                    <td class="font-bold">${q.number}</td>
                    <td>
                        ${q.parts.map((p: any) => `
                            <div style="margin-bottom: 5px;">
                                ${p.label || ''} ${p.text}
                                ${p.subparts ? p.subparts.map((sp: string) => `<div class="sub-question">${sp}</div>`).join('') : ''}
                            </div>
                        `).join('')}
                    </td>
                    <td class="col-marks">${q.parts.length > 1 ? `[${q.parts.map((p: any) => p.marks).join('+')}]` : q.parts[0].marks}</td>
                    <td class="text-right">${q.co}</td>
                </tr>
            `).join('')}
        </tbody>
    </table>
    `;
}

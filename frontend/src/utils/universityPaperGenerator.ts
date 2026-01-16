// Enhanced paper generation matching actual university exam format

export function generateUniversityPaper(
    subject: string,
    insights: any,
    semester: string = 'V',
    examType: string = 'Mid Term',
    totalMarks: number = 30
): any {
    const currentDate = new Date();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();

    return {
        header: {
            university: 'Faculty of Science, Technology and Architecture',
            school: 'School of Computer Science and Engineering',
            department: 'Department of Artificial Intelligence and Machine Learning',
            program: 'B.Tech. (CSE) - AIML',
            courseCode: generateCourseCode(subject),
            courseName: subject,
            semester: semester,
            examTitle: `${examType} Examination, ${month} ${year}`,
            duration: '1.5 hrs',
            maxMarks: totalMarks,
        },
        instructions: [
            'All questions are compulsory.',
            'Missing data, if any, may be assumed suitably.',
            'Calculator is allowed.',
        ],
        sections: {
            sectionA: generateSectionA(subject, insights),
            sectionB: generateSectionB(subject, insights),
            sectionC: generateSectionC(subject, insights),
        },
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
    return codes[subject] || 'CSE3XXX';
}

function generateSectionA(subject: string, insights: any) {
    return {
        title: 'SECTION A (Memory Based Questions)',
        subtitle: '(20-30 words Answers)',
        questions: [
            {
                number: 'A1',
                parts: [
                    {
                        text: `Match the following terms related to ${subject.toLowerCase()} with their descriptions:`,
                        type: 'matching',
                        marks: '0.5*4',
                    },
                ],
                totalMarks: 2,
                co: 'CO1',
            },
            {
                number: 'A2',
                parts: [
                    {
                        text: getShortAnswerQuestion(subject, insights, 1),
                        marks: '1*2',
                    },
                ],
                totalMarks: 2,
                co: 'CO2',
            },
            {
                number: 'A3',
                parts: [
                    {
                        text: getShortAnswerQuestion(subject, insights, 2),
                        marks: '1*2',
                    },
                ],
                totalMarks: 2,
                co: 'CO1',
            },
        ],
        maxMarks: 6,
    };
}

function generateSectionB(subject: string, insights: any) {
    return {
        title: 'SECTION B (Concept Based Questions)',
        subtitle: '(Maximum 150-200 Words Answers)',
        questions: [
            {
                number: 'B1',
                parts: [
                    {
                        text: getConceptQuestion(subject, insights, 1),
                        subparts: [
                            '(i) Calculate the required parameter.',
                            '(ii) Compare with theoretical limits.',
                        ],
                        marks: '2+2',
                    },
                ],
                totalMarks: 4,
                co: 'CO2',
            },
            {
                number: 'B2',
                parts: [
                    {
                        text: getConceptQuestion(subject, insights, 2),
                        marks: '1*4',
                    },
                ],
                totalMarks: 4,
                co: 'CO1',
            },
            {
                number: 'B3',
                parts: [
                    {
                        text: getConceptQuestion(subject, insights, 3),
                        subparts: [
                            'I. Compute the required bits.',
                            'II. Verify the result.',
                        ],
                        marks: '2+2',
                    },
                ],
                totalMarks: 4,
                co: 'CO2',
            },
            {
                number: 'B4',
                parts: [
                    {
                        text: getConceptQuestion(subject, insights, 4),
                        subparts: [
                            '(i) Calculate the minimum requirement.',
                            '(ii) Explain the necessity.',
                        ],
                        marks: '2+2',
                    },
                ],
                totalMarks: 4,
                co: 'CO2',
            },
        ],
        maxMarks: 16,
    };
}

function generateSectionC(subject: string, insights: any) {
    return {
        title: 'SECTION-C (Analytical Based Questions)',
        subtitle: '(Maximum 300-350 words Answers)',
        questions: [
            {
                number: 'C1',
                parts: [
                    {
                        label: 'A)',
                        text: getAnalyticalQuestion(subject, insights, 1),
                        subparts: [
                            'I. Construct the complete solution.',
                            'II. Show error detection and correction.',
                        ],
                        marks: '2+2',
                    },
                    {
                        label: 'B)',
                        text: getAnalyticalQuestion(subject, insights, 2),
                        subparts: [
                            'I. Calculate the utilization.',
                            'II. Compare different protocols and analyze.',
                        ],
                        marks: '2+2',
                    },
                ],
                totalMarks: 8,
                co: 'CO2',
            },
        ],
        maxMarks: 8,
    };
}

function getShortAnswerQuestion(subject: string, insights: any, index: number): string {
    const questions: Record<string, string[]> = {
        'Computer Networks': [
            'Draw the line coding waveform for Bipolar AMI and Differential Manchester for bit stream 1101001110 transmitted at 2 Mbps.',
            'A data frame of 1101 is to be transmitted with even parity. Write the transmitted frame.',
            'Explain the difference between circuit switching and packet switching with examples.',
        ],
        'Operating Systems': [
            'Draw the Gantt chart for FCFS scheduling with arrival times [0, 1, 2] and burst times [4, 3, 1].',
            'Calculate the effective access time given TLB hit ratio = 80%, TLB access = 20ns, Memory access = 100ns.',
            'Explain the difference between internal and external fragmentation.',
        ],
        'Database Management Systems': [
            'Write an SQL query to find the second highest salary from an Employee table.',
            'Normalize the given relation to 3NF showing all intermediate steps.',
            'Explain the ACID properties with one example for each.',
        ],
    };
    return questions[subject]?.[index] || 'Define the key concepts and their applications.';
}

function getConceptQuestion(subject: string, insights: any, index: number): string {
    const questions: Record<string, string[]> = {
        'Computer Networks': [
            'A channel has a bandwidth of 4 kHz and SNR of 30 dB.',
            'An ALOHA network transmits 600-bit frames on a shared channel of 600 kbps. The system generates traffic at 750 frames per second.',
            'A data link uses CRC with divisor polynomial x³ + x + 1. The dataword is 1101.',
            'In Ethernet using CSMA/CD, if propagation delay is 25 μs and data rate is 10 Mbps:',
        ],
        'Operating Systems': [
            'A system has 3 processes with arrival times [0, 2, 4] and burst times [8, 4, 1]. Calculate average waiting time for SJF scheduling.',
            'Given memory partitions [100K, 500K, 200K, 300K, 600K] and processes [212K, 417K, 112K, 426K], show First Fit and Best Fit allocation.',
            'A system uses Banker\'s algorithm with 3 resource types. Given allocation and max matrices, determine if the system is in safe state.',
            'Calculate the number of page faults for reference string [7,0,1,2,0,3,0,4,2,3,0,3,2] using FIFO with 3 frames.',
        ],
    };
    return questions[subject]?.[index - 1] || 'Analyze the given scenario and provide detailed solution.';
}

function getAnalyticalQuestion(subject: string, insights: any, index: number): string {
    const questions: Record<string, string[]> = {
        'Computer Networks': [
            'A dataword 1011001 is to be transmitted using Hamming code (even parity).',
            'A link has Bandwidth = 1 Mbps, Propagation delay = 20 ms, Frame size = 1000 bits.',
        ],
        'Operating Systems': [
            'A system has 5 processes and 3 resource types A(10), B(5), C(7). Given allocation and max matrices, apply Banker\'s algorithm.',
            'A disk queue has requests [98, 183, 37, 122, 14, 124, 65, 67] and head at 53. Compare FCFS, SSTF, and SCAN algorithms.',
        ],
    };
    return questions[subject]?.[index - 1] || 'Solve the comprehensive problem showing all steps and analysis.';
}

export function formatUniversityPaper(paper: any): string {
    let output = `
═══════════════════════════════════════════════════════════════════════════════
                                 EXAMINATION PAPER
═══════════════════════════════════════════════════════════════════════════════

Name: _______________________
Enrolment No: _______________

${paper.header.examTitle}
${paper.header.university}
${paper.header.school}
${paper.header.department}
${paper.header.program}

Course Code: ${paper.header.courseCode}          Course: ${paper.header.courseName}          Semester: ${paper.header.semester}
Time: ${paper.header.duration}                                                      Max. Marks: ${paper.header.maxMarks}

Instructions:
${paper.instructions.map((inst: string, i: number) => `  ${i + 1}. ${inst}`).join('\n')}

═══════════════════════════════════════════════════════════════════════════════

${paper.sections.sectionA.title}
${paper.sections.sectionA.subtitle}

${paper.sections.sectionA.questions.map((q: any) => `
Q ${q.number}    ${q.parts.map((p: any) => p.text).join('\n         ')}
         ${q.parts.map((p: any) => `[${p.marks} Marks]`).join(' ')}
         Max Marks: ${q.totalMarks}    CO: ${q.co}
`).join('\n')}

───────────────────────────────────────────────────────────────────────────────

${paper.sections.sectionB.title}
${paper.sections.sectionB.subtitle}

${paper.sections.sectionB.questions.map((q: any) => `
Q ${q.number}    ${q.parts[0].text}
         ${q.parts[0].subparts ? q.parts[0].subparts.join('\n         ') : ''}
         [${q.parts[0].marks} Marks]
         Max Marks: ${q.totalMarks}    CO: ${q.co}
`).join('\n')}

───────────────────────────────────────────────────────────────────────────────

${paper.sections.sectionC.title}
${paper.sections.sectionC.subtitle}

${paper.sections.sectionC.questions.map((q: any) => `
Q ${q.number}    ${q.parts.map((part: any) => `
         ${part.label} ${part.text}
         ${part.subparts.join('\n         ')}
         [${part.marks} Marks]
`).join('\n')}
         Max Marks: ${q.totalMarks}    CO: ${q.co}
`).join('\n')}

═══════════════════════════════════════════════════════════════════════════════
                                  END OF PAPER
═══════════════════════════════════════════════════════════════════════════════

Generated on: ${paper.generatedAt.toLocaleDateString()} at ${paper.generatedAt.toLocaleTimeString()}
`;

    return output;
}

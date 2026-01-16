// Question templates for different subjects and topics
export const questionTemplates: Record<string, Record<string, string[]>> = {
    'operating-systems': {
        'Memory Management': [
            'Explain the difference between paging and segmentation with suitable examples.',
            'What is virtual memory? Describe the page replacement algorithms.',
            'Calculate the effective access time given: TLB hit ratio = 80%, TLB access time = 20ns, Memory access time = 100ns.',
            'Explain the concept of thrashing and how to prevent it.',
            'Describe the working of demand paging with a neat diagram.',
        ],
        'Process Scheduling': [
            'Compare and contrast preemptive and non-preemptive scheduling algorithms.',
            'Explain Round Robin scheduling with an example.',
            'Calculate average waiting time for FCFS scheduling given arrival times and burst times.',
            'What is the convoy effect? How does it affect system performance?',
            'Describe multilevel queue scheduling with suitable examples.',
        ],
        'Deadlocks': [
            'State and explain the four necessary conditions for deadlock.',
            'Describe the Banker\'s algorithm for deadlock avoidance.',
            'Given a resource allocation graph, determine if the system is in deadlock.',
            'Compare deadlock prevention and deadlock avoidance strategies.',
            'Explain the concept of safe state with an example.',
        ],
        'File Systems': [
            'Explain different file allocation methods with their advantages and disadvantages.',
            'What is a directory structure? Describe different types of directory structures.',
            'Explain the concept of file access methods.',
            'Describe the working of indexed allocation method.',
            'What is disk scheduling? Explain SCAN and C-SCAN algorithms.',
        ],
        'CPU Scheduling': [
            'Calculate turnaround time and waiting time for SJF scheduling.',
            'Explain priority scheduling with aging technique.',
            'Compare FCFS, SJF, and Round Robin scheduling algorithms.',
            'What is CPU burst time? How does it affect scheduling decisions?',
            'Describe the concept of context switching overhead.',
        ],
    },
    'computer-networks': {
        'Data Link Layer': [
            'Explain the framing methods used in data link layer.',
            'What is CSMA/CD? Describe its working with binary exponential backoff.',
            'Describe the sliding window protocol with Go-Back-N ARQ.',
            'Explain error detection using CRC with an example.',
            'What is the difference between stop-and-wait and sliding window protocols?',
        ],
        'Network Layer': [
            'Explain IPv4 addressing and subnetting with examples.',
            'Describe the working of distance vector routing algorithm.',
            'What is NAT? Explain its types and applications.',
            'Compare link state and distance vector routing protocols.',
            'Explain the concept of IP fragmentation and reassembly.',
        ],
        'Transport Layer': [
            'Explain the three-way handshake in TCP connection establishment.',
            'What is flow control? Describe TCP flow control mechanisms.',
            'Compare TCP and UDP protocols with suitable applications.',
            'Explain congestion control in TCP.',
            'Describe the working of sliding window protocol in TCP.',
        ],
    },
    'database-management': {
        'SQL Queries': [
            'Write an SQL query to find the second highest salary from an Employee table.',
            'Explain JOIN operations with examples of INNER, LEFT, RIGHT, and FULL OUTER JOIN.',
            'Write a query to find employees who earn more than their managers.',
            'What are aggregate functions? Write queries using GROUP BY and HAVING clauses.',
            'Explain the difference between WHERE and HAVING clauses with examples.',
        ],
        'Normalization': [
            'Explain the concept of functional dependency with examples.',
            'What is normalization? Describe 1NF, 2NF, 3NF, and BCNF with examples.',
            'Given a relation, normalize it to 3NF showing all steps.',
            'What is denormalization? When and why is it used?',
            'Explain the concept of lossless join decomposition.',
        ],
        'Transactions': [
            'Explain ACID properties of transactions with examples.',
            'What is a transaction schedule? Differentiate between serial and serializable schedules.',
            'Describe the two-phase locking protocol.',
            'Explain timestamp-based concurrency control.',
            'What is deadlock in database systems? How is it detected and resolved?',
        ],
        'Indexing': [
            'Explain B-tree and B+ tree indexing with examples.',
            'What is the difference between clustered and non-clustered indexes?',
            'Describe hash-based indexing techniques.',
            'When should you create an index on a table column?',
            'Explain the concept of composite indexes.',
        ],
        'ER Diagrams': [
            'Design an ER diagram for a library management system.',
            'Explain different types of relationships in ER modeling.',
            'What is the difference between strong and weak entities?',
            'Convert a given ER diagram to relational schema.',
            'Explain generalization and specialization in ER modeling.',
        ],
    },
    'data-structures': {
        'Trees': [
            'Explain binary search tree operations with examples.',
            'What is an AVL tree? Describe rotation operations.',
            'Write an algorithm for level-order traversal of a binary tree.',
            'Explain the concept of height-balanced trees.',
            'Describe the working of Red-Black trees.',
        ],
        'Dynamic Programming': [
            'Solve the 0/1 Knapsack problem using dynamic programming.',
            'Explain the longest common subsequence problem with an example.',
            'What is memoization? How does it differ from tabulation?',
            'Solve the matrix chain multiplication problem.',
            'Explain the concept of optimal substructure.',
        ],
        'Graphs': [
            'Explain Dijkstra\'s shortest path algorithm with an example.',
            'What is the difference between BFS and DFS? Provide applications of each.',
            'Describe Kruskal\'s algorithm for minimum spanning tree.',
            'Explain topological sorting with an example.',
            'What is a strongly connected component? How do you find it?',
        ],
        'Sorting Algorithms': [
            'Compare time and space complexity of Quick Sort and Merge Sort.',
            'Explain the working of Heap Sort with an example.',
            'What is the best case time complexity of Bubble Sort?',
            'Describe counting sort and when it is most efficient.',
            'Explain the concept of stable sorting algorithms.',
        ],
        'Linked Lists': [
            'Write an algorithm to detect a cycle in a linked list.',
            'Explain the difference between singly and doubly linked lists.',
            'How do you reverse a linked list? Provide the algorithm.',
            'What are the advantages of linked lists over arrays?',
            'Describe the implementation of a stack using linked list.',
        ],
        'Hashing': [
            'Explain collision resolution techniques in hashing.',
            'What is the load factor in hash tables? How does it affect performance?',
            'Describe separate chaining and open addressing.',
            'Explain the concept of universal hashing.',
            'What is perfect hashing? When is it used?',
        ],
    },
};

// Generate questions based on topic weightage and question types
export function generatePracticePaper(
    subject: string,
    insights: any,
    totalMarks: number = 100
): any {
    const subjectKey = subject.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '');
    const templates = questionTemplates[subjectKey] || {};

    const questions: any[] = [];
    let currentMarks = 0;
    let questionNumber = 1;

    // Get topics sorted by weightage
    const topics = Object.entries(insights.topicWeightage)
        .sort(([, a]: any, [, b]: any) => b - a);

    // Generate questions for each topic based on weightage
    for (const [topic, weightage] of topics) {
        const topicMarks = Math.round((weightage as number / 100) * totalMarks);
        const questionType = insights.topicQuestionTypeMap[topic] || 'Subjective';
        const topicTemplates = templates[topic] || [];

        if (topicTemplates.length === 0) continue;

        // Determine number of questions and marks per question
        let numQuestions = 1;
        let marksPerQuestion = topicMarks;

        if (questionType === 'MCQ') {
            numQuestions = Math.max(Math.floor(topicMarks / 2), 1);
            marksPerQuestion = 2;
        } else if (questionType === 'Numerical') {
            numQuestions = Math.max(Math.floor(topicMarks / 5), 1);
            marksPerQuestion = 5;
        } else {
            numQuestions = Math.max(Math.floor(topicMarks / 10), 1);
            marksPerQuestion = 10;
        }

        // Generate questions
        for (let i = 0; i < numQuestions && currentMarks < totalMarks; i++) {
            const questionText = topicTemplates[i % topicTemplates.length];

            questions.push({
                number: questionNumber++,
                topic,
                type: questionType,
                marks: marksPerQuestion,
                question: questionText,
            });

            currentMarks += marksPerQuestion;
        }
    }

    return {
        subject: insights.subject,
        totalMarks: currentMarks,
        totalQuestions: questions.length,
        duration: '3 hours',
        instructions: [
            'Answer all questions.',
            'All questions carry equal marks unless specified.',
            'Draw neat diagrams wherever necessary.',
            'Use of non-programmable calculators is allowed.',
        ],
        questions,
        generatedAt: new Date(),
    };
}

// Format paper for download/display
export function formatPaperAsText(paper: any): string {
    let text = `
═══════════════════════════════════════════════════════════════
                    ${paper.subject.toUpperCase()}
                      PRACTICE EXAMINATION
═══════════════════════════════════════════════════════════════

Time: ${paper.duration}                          Total Marks: ${paper.totalMarks}

INSTRUCTIONS:
${paper.instructions.map((inst: string, i: number) => `${i + 1}. ${inst}`).join('\n')}

═══════════════════════════════════════════════════════════════

`;

    paper.questions.forEach((q: any) => {
        text += `\nQ${q.number}. [${q.marks} marks] [${q.type}] [Topic: ${q.topic}]\n`;
        text += `${q.question}\n`;
        text += `\n${'─'.repeat(65)}\n`;
    });

    text += `\n═══════════════════════════════════════════════════════════════\n`;
    text += `                         END OF PAPER\n`;
    text += `═══════════════════════════════════════════════════════════════\n`;

    return text;
}

import React from 'react';
import '../pages/Subjects.css';

interface Subject {
    subjectId: string;
    subject: string;
    paperCount: number;
    status: 'ready' | 'bootstrapping';
}

interface SubjectCardProps {
    subject: Subject;
    onClick: () => void;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ subject, onClick }) => {
    return (
        <div
            className={`subject-card ${subject.status}`}
            onClick={onClick}
        >
            <div className="subject-card-content">
                <h3 className="subject-name">{subject.subject}</h3>
                <p className="paper-count">{subject.paperCount} papers analyzed</p>
            </div>
            <span className={`status-badge ${subject.status}`}>
                {subject.status === 'ready' ? 'Ready' : 'Bootstrapping'}
            </span>
        </div>
    );
};

export default SubjectCard;

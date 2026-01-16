import React from 'react';
import '../pages/Subjects.css';

interface Subject {
    subjectId?: string;
    id?: string;
    subject?: string;
    name?: string;
    paperCount?: number;
    status: 'ready' | 'bootstrapping' | 'coming-soon';
}

interface SubjectCardProps {
    subject: Subject;
    onClick: () => void;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ subject, onClick }) => {
    const displayName = subject.name || subject.subject;
    const displayStatus = subject.status === 'ready' ? 'Ready' : (subject.status === 'coming-soon' ? 'Coming Soon' : 'Bootstrapping');

    return (
        <div
            className={`subject-card ${subject.status}`}
            onClick={onClick}
        >
            <div className="subject-card-content">
                <h3 className="subject-name">{displayName}</h3>
                {subject.status === 'ready' && subject.paperCount && (
                    <p className="paper-count">{subject.paperCount} papers analyzed</p>
                )}
                {subject.status !== 'ready' && (
                    <p className="paper-count">No papers yet</p>
                )}
            </div>
            <span className={`status-badge ${subject.status}`}>
                {displayStatus}
            </span>
        </div>
    );
};

export default SubjectCard;

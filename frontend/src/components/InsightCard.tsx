import React from 'react';
import '../pages/SubjectInsights.css';

interface InsightCardProps {
    title: string;
    children: React.ReactNode;
}

const InsightCard: React.FC<InsightCardProps> = ({ title, children }) => {
    return (
        <div className="insight-card">
            <h3 className="insight-card-title">{title}</h3>
            <div className="insight-card-content">{children}</div>
        </div>
    );
};

export default InsightCard;

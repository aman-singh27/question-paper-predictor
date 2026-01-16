import React from 'react';
import '../pages/SubjectInsights.css';

interface InsightRowProps {
    label: string;
    value: string | number;
    highlight?: boolean;
}

const InsightRow: React.FC<InsightRowProps> = ({ label, value, highlight = false }) => {
    return (
        <div className={`insight-row ${highlight ? 'highlight' : ''}`}>
            <span className="insight-row-label">{label}</span>
            <span className="insight-row-value">{value}</span>
        </div>
    );
};

export default InsightRow;

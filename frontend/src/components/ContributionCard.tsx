import React from 'react';
import './ContributionCard.css';

interface ContributionCardProps {
    subjectName: string;
    examYear?: string;
    status: 'used' | 'duplicate';
    uploadedAt?: string;
}

const ContributionCard: React.FC<ContributionCardProps> = ({
    subjectName,
    examYear,
    status
}) => {
    const getStatusText = () => {
        return status === 'used' ? 'Used in analysis' : 'Duplicate (already existed)';
    };

    return (
        <div className="contribution-card">
            <div className="contribution-header">
                <h4 className="contribution-subject">{subjectName}</h4>
                {examYear && <span className="contribution-year">{examYear}</span>}
            </div>
            <p className={`contribution-status ${status}`}>
                {getStatusText()}
            </p>
        </div>
    );
};

export default ContributionCard;

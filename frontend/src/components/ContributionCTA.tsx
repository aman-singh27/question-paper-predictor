import React from 'react';
import '../pages/SubjectInsights.css';

interface ContributionCTAProps {
    isBootstrapping: boolean;
    onContribute?: () => void;
}

const ContributionCTA: React.FC<ContributionCTAProps> = ({ isBootstrapping, onContribute }) => {
    if (isBootstrapping) {
        return (
            <div className="contribution-cta primary">
                <h3>Help improve accuracy</h3>
                <p>Contribute an exam paper to help future students get better insights.</p>
                <button className="cta-button primary" onClick={onContribute}>
                    Contribute an Exam Paper
                </button>
            </div>
        );
    }

    return (
        <div className="contribution-cta secondary">
            <p>Have a newer paper? Help keep insights up to date.</p>
            <button className="cta-button secondary" onClick={onContribute}>
                Contribute
            </button>
        </div>
    );
};

export default ContributionCTA;

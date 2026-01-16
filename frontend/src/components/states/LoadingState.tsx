import React from 'react';
import './LoadingState.css';

interface LoadingStateProps {
    variant: 'subjects-grid' | 'subject-insights';
}

const LoadingState: React.FC<LoadingStateProps> = ({ variant }) => {
    if (variant === 'subjects-grid') {
        return (
            <div className="skeleton-grid">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="skeleton-card"></div>
                ))}
            </div>
        );
    }

    if (variant === 'subject-insights') {
        return (
            <>
                <div className="skeleton-overview"></div>
                <div className="skeleton-grid">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="skeleton-card"></div>
                    ))}
                </div>
            </>
        );
    }

    return null;
};

export default LoadingState;

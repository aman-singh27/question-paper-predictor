import React from 'react';
import './ErrorState.css';

interface ErrorStateProps {
    onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ onRetry }) => {
    return (
        <div className="error-state">
            <h3 className="error-state-title">Something went wrong.</h3>
            <p className="error-state-message">Please try again.</p>
            <button className="error-state-button" onClick={onRetry}>
                Retry
            </button>
        </div>
    );
};

export default ErrorState;

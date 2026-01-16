import React from 'react';
import './EmptyState.css';

interface EmptyStateProps {
    title: string;
    message: string;
    actionLabel?: string;
    onAction?: () => void;
    actionDisabled?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title,
    message,
    actionLabel,
    onAction,
    actionDisabled = false
}) => {
    return (
        <div className="empty-state">
            <h3 className="empty-state-title">{title}</h3>
            <p className="empty-state-message">{message}</p>
            {actionLabel && (
                <button
                    className="empty-state-button"
                    onClick={onAction}
                    disabled={actionDisabled}
                >
                    {actionLabel}
                </button>
            )}
        </div>
    );
};

export default EmptyState;

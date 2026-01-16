import React from 'react';
import './EmptyState.css';

interface EmptyStateProps {
    title: string;
    message: string;
    icon?: string;
    actionLabel?: string;
    onAction?: () => void;
    actionDisabled?: boolean;
    secondaryLabel?: string;
    onSecondary?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title,
    message,
    icon = '📭',
    actionLabel,
    onAction,
    actionDisabled = false,
    secondaryLabel,
    onSecondary
}) => {
    return (
        <div className="empty-state">
            <div className="empty-state-icon">{icon}</div>
            <h3 className="empty-state-title">{title}</h3>
            <p className="empty-state-message">{message}</p>
            <div className="empty-state-actions">
                {actionLabel && (
                    <button
                        className="empty-state-button primary"
                        onClick={onAction}
                        disabled={actionDisabled}
                    >
                        {actionLabel}
                    </button>
                )}
                {secondaryLabel && (
                    <button
                        className="empty-state-button secondary"
                        onClick={onSecondary}
                    >
                        {secondaryLabel}
                    </button>
                )}
            </div>
        </div>
    );
};

export default EmptyState;

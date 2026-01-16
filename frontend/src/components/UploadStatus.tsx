import React from 'react';
import './UploadStatus.css';

interface UploadStatusProps {
    status: 'success' | 'error';
    onRetry?: () => void;
    onDone?: () => void;
}

const UploadStatus: React.FC<UploadStatusProps> = ({ status, onRetry, onDone }) => {
    if (status === 'success') {
        return (
            <div className="upload-status success">
                <div className="status-icon-container">
                    <svg className="status-icon checkmark" width="64" height="64" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="#34a853" strokeWidth="2" fill="none" />
                        <path d="M8 12L11 15L16 9" stroke="#34a853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <h3 className="status-title">Paper uploaded successfully.</h3>
                <p className="status-message">
                    We're analyzing it in the background.<br />
                    If it's new, insights will update automatically.
                </p>
                <button className="status-button primary" onClick={onDone}>
                    Done
                </button>
            </div>
        );
    }

    return (
        <div className="upload-status error">
            <div className="status-icon-container">
                <svg className="status-icon error-icon" width="64" height="64" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#ea4335" strokeWidth="2" fill="none" />
                    <path d="M12 8V12" stroke="#ea4335" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="12" cy="16" r="1" fill="#ea4335" />
                </svg>
            </div>
            <h3 className="status-title">Upload failed.</h3>
            <p className="status-message">
                Please try again with a clearer file.
            </p>
            <button className="status-button secondary" onClick={onRetry}>
                Retry
            </button>
        </div>
    );
};

export default UploadStatus;

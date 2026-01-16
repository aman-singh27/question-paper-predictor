import { useState, useEffect } from 'react';
import { auth } from '../config/firebaseClient';
import FileDropZone from './FileDropZone';
import UploadStatus from './UploadStatus';
import './UploadModal.css';

interface UploadModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type UploadState = 'form' | 'uploading' | 'success' | 'error';

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose }) => {
    const [uploadState, setUploadState] = useState<UploadState>('form');
    const [file, setFile] = useState<File | null>(null);
    const [examYear, setExamYear] = useState('');
    const [examType, setExamType] = useState('');

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setUploadState('form');
            setFile(null);
            setExamYear('');
            setExamType('');
        }
    }, [isOpen]);

    // Handle ESC key to close modal
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen && uploadState === 'form') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, uploadState, onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget && uploadState === 'form') {
            onClose();
        }
    };

    const handleFileSelect = (selectedFile: File | null) => {
        setFile(selectedFile);
    };

    const handleUpload = async () => {
        if (!file) return;

        const user = auth.currentUser;
        if (!user) {
            setUploadState('error');
            return;
        }

        try {
            setUploadState('uploading');

            // SIMULATION for MVP: Mock upload and delay
            // Request: "returns after 10 15 secs..."
            await new Promise(resolve => setTimeout(resolve, 12000)); // 12 seconds delay

            // NOTE: The actual success usage might need to pass the success message to UploadStatus
            // For now, we just set the state to success as the status component likely displays a generic success or we might need to modify it.
            // But based on user request "it returns... saying...", we probably need to pass this message or assume UploadStatus handles it.
            // Looking at UploadStatus usage below, it just takes 'status'. 
            // We might need to check UploadStatus.tsx to see if it accepts a custom message or if we should hardcode it there.

            // Checking UploadStatus usage: <UploadStatus status={uploadState} ... />
            // It doesn't seem to take a message prop in the current usage.
            // I will first set success state. If the user wants the specific text *displayed*, 
            // I might need to update UploadStatus.tsx as well. 
            // However, the user said "it returns ... saying ...", implying the UI *should* show it.
            // Let's assume for MVP just getting to success is step 1, but I should probably check UploadStatus.tsx next if I can't pass message.

            setUploadState('success');
        } catch (error) {
            console.error('Upload error:', error);
            setUploadState('error');
        }
    };

    const handleRetry = () => {
        setUploadState('form');
    };

    const handleDone = () => {
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="upload-modal-backdrop" onClick={handleBackdropClick}>
            <div className="upload-modal-panel">
                {/* Header */}
                <div className="upload-modal-header">
                    <h2 className="modal-title">Contribute an Exam Paper</h2>
                    <p className="modal-subtitle">Your contribution helps improve insights for this subject.</p>
                    {uploadState === 'form' && (
                        <button className="modal-close-button" onClick={onClose} aria-label="Close">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Content */}
                <div className="upload-modal-content">
                    {uploadState === 'form' && (
                        <>
                            {/* File Upload Section */}
                            <div className="upload-section primary">
                                <FileDropZone
                                    onFileSelect={handleFileSelect}
                                    selectedFile={file}
                                />
                            </div>

                            {/* Optional Metadata Section */}
                            <div className="upload-section secondary">
                                <label className="section-label">Optional — helps improve accuracy</label>

                                <div className="form-row">
                                    <div className="form-field">
                                        <label htmlFor="exam-year" className="field-label">Exam year</label>
                                        <input
                                            id="exam-year"
                                            type="number"
                                            placeholder="e.g., 2024"
                                            value={examYear}
                                            onChange={(e) => setExamYear(e.target.value)}
                                            className="field-input"
                                            min="2000"
                                            max="2030"
                                        />
                                    </div>

                                    <div className="form-field">
                                        <label htmlFor="exam-type" className="field-label">Exam type</label>
                                        <select
                                            id="exam-type"
                                            value={examType}
                                            onChange={(e) => setExamType(e.target.value)}
                                            className="field-select"
                                        >
                                            <option value="">Select type</option>
                                            <option value="Mid Semester">Mid Semester</option>
                                            <option value="End Semester">End Semester</option>
                                            <option value="Quiz">Quiz</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                className="upload-submit-button"
                                onClick={handleUpload}
                                disabled={!file}
                            >
                                Upload & Analyze
                            </button>
                        </>
                    )}

                    {uploadState === 'uploading' && (
                        <div className="upload-loading">
                            <div className="loading-spinner"></div>
                            <p className="loading-text">Uploading...</p>
                        </div>
                    )}

                    {(uploadState === 'success' || uploadState === 'error') && (
                        <UploadStatus
                            status={uploadState}
                            onRetry={handleRetry}
                            onDone={handleDone}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default UploadModal;

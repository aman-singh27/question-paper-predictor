import React, { useState } from 'react';
import { auth } from '../config/firebaseClient';
import './UploadPaper.css';

interface UploadPaperProps {
    subjectId: string;
    isBootstrapping: boolean;
}

const UploadPaper: React.FC<UploadPaperProps> = ({ subjectId, isBootstrapping }) => {
    const [file, setFile] = useState<File | null>(null);
    const [examYear, setExamYear] = useState('');
    const [examType, setExamType] = useState('');
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            // Validate file type
            const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
            if (validTypes.includes(selectedFile.type)) {
                setFile(selectedFile);
                setMessage(null);
            } else {
                setMessage({ type: 'error', text: 'Invalid file type. Please upload PDF, JPG, or PNG.' });
                setFile(null);
            }
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage({ type: 'error', text: 'Please select a file first.' });
            return;
        }

        const user = auth.currentUser;
        if (!user) {
            setMessage({ type: 'error', text: 'User not authenticated.' });
            return;
        }

        try {
            setUploading(true);
            setMessage(null);

            // SIMULATION: Mock upload and analysis delay
            // Request: "returns after 10 15 secs saying that paper analyzed..."
            await new Promise(resolve => setTimeout(resolve, 12000)); // 12 seconds delay

            // Mock Success Message
            setMessage({
                type: 'success',
                text: 'Paper analyzed Year 2024 -25 \n CSE core Computer network \n ete paper',
            });

            // Reset form
            setFile(null);
            setExamYear('');
            setExamType('');

            // Reset file input
            const fileInput = document.getElementById('file-input') as HTMLInputElement;
            if (fileInput) fileInput.value = '';

        } catch (error) {
            console.error('Upload error:', error);
            setMessage({ type: 'error', text: 'Upload failed. Please try again.' });
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="upload-paper-container">
            {isBootstrapping ? (
                <div className="upload-message bootstrapping">
                    <p><strong>This subject needs more exam papers to generate reliable insights.</strong></p>
                </div>
            ) : (
                <div className="upload-message ready">
                    <p>Have a newer paper? Contribute to improve accuracy.</p>
                </div>
            )}

            <div className="upload-form">
                <div className="form-group">
                    <label htmlFor="file-input">Select Exam Paper (PDF, JPG, PNG):</label>
                    <input
                        id="file-input"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        disabled={uploading}
                    />
                    {file && <p className="file-selected">Selected: {file.name}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="exam-year">Exam Year (Optional):</label>
                    <input
                        id="exam-year"
                        type="text"
                        placeholder="e.g., 2024"
                        value={examYear}
                        onChange={(e) => setExamYear(e.target.value)}
                        disabled={uploading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="exam-type">Exam Type (Optional):</label>
                    <select
                        id="exam-type"
                        value={examType}
                        onChange={(e) => setExamType(e.target.value)}
                        disabled={uploading}
                    >
                        <option value="">Select type</option>
                        <option value="Mid Semester">Mid Semester</option>
                        <option value="End Semester">End Semester</option>
                        <option value="Quiz">Quiz</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <button
                    onClick={handleUpload}
                    disabled={!file || uploading}
                    className="upload-btn"
                >
                    {uploading ? 'Uploading...' : 'Upload Paper'}
                </button>

                {message && (
                    <div className={`upload-message ${message.type}`}>
                        {message.text}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UploadPaper;

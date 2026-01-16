import React, { useState, useRef } from 'react';
import './FileDropZone.css';

interface FileDropZoneProps {
    onFileSelect: (file: File | null) => void;
    disabled?: boolean;
    selectedFile?: File | null;
}

const FileDropZone: React.FC<FileDropZoneProps> = ({ onFileSelect, disabled = false, selectedFile = null }) => {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) {
            setIsDragging(true);
        }
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (disabled) return;

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            handleFile(files[0]);
        }
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFile(files[0]);
        }
    };

    const handleFile = (file: File) => {
        const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
        if (validTypes.includes(file.type)) {
            onFileSelect(file);
        } else {
            onFileSelect(null);
            alert('Invalid file type. Please upload PDF, JPG, or PNG.');
        }
    };

    const handleClick = () => {
        if (!disabled && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="file-drop-zone-container">
            <div
                className={`file-drop-zone ${isDragging ? 'dragging' : ''} ${disabled ? 'disabled' : ''} ${selectedFile ? 'has-file' : ''}`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleClick}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileInputChange}
                    disabled={disabled}
                    style={{ display: 'none' }}
                />

                {selectedFile ? (
                    <div className="file-selected-display">
                        <svg className="file-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="file-name">{selectedFile.name}</span>
                    </div>
                ) : (
                    <div className="drop-zone-content">
                        <svg className="upload-icon" width="48" height="48" viewBox="0 0 24 24" fill="none">
                            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M17 8L12 3L7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="drop-zone-title">Drag & drop your exam paper here</p>
                        <p className="drop-zone-subtitle">or click to browse</p>
                        <p className="drop-zone-helper">Scanned papers or PDFs work best.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileDropZone;

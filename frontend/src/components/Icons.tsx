import React from 'react';

interface IconProps {
    size?: number;
    color?: string;
    className?: string;
}

// Document/Tag Icon - for "Random PYQs"
export const DocumentIcon: React.FC<IconProps> = ({ size = 24, color = '#4285f4', className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" className={className}>
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
        <polyline points="13 2 13 9 20 9"></polyline>
        <path d="M9 15h6M9 11h6"></path>
    </svg>
);

// Books Icon - for "Syllabus"
export const BooksIcon: React.FC<IconProps> = ({ size = 24, color = '#4285f4', className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" className={className}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
    </svg>
);

// Refresh Icon - for "Repeated questions"
export const RefreshIcon: React.FC<IconProps> = ({ size = 24, color = '#4285f4', className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" className={className}>
        <polyline points="23 4 23 10 17 10"></polyline>
        <polyline points="1 20 1 14 7 14"></polyline>
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36M20.49 15a9 9 0 0 1-14.85 3.36"></path>
    </svg>
);

// Upload Icon - for "Upload/Select subject"
export const UploadIcon: React.FC<IconProps> = ({ size = 24, color = '#4285f4', className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" className={className}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="17 8 12 3 7 8"></polyline>
        <line x1="12" y1="3" x2="12" y2="15"></line>
    </svg>
);

// Zap/AI Icon - for "AI analyzes"
export const ZapIcon: React.FC<IconProps> = ({ size = 24, color = '#4285f4', className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" className={className}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
);

// BarChart Icon - for "Topic-wise insights"
export const BarChartIcon: React.FC<IconProps> = ({ size = 24, color = '#4285f4', className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" className={className}>
        <line x1="12" y1="20" x2="12" y2="10"></line>
        <line x1="18" y1="20" x2="18" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="16"></line>
    </svg>
);

// Settings/Gear Icon - for settings/configuration
export const SettingsIcon: React.FC<IconProps> = ({ size = 24, color = '#4285f4', className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" className={className}>
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24"></path>
    </svg>
);

// Eye Icon - for "View demo"
export const EyeIcon: React.FC<IconProps> = ({ size = 24, color = '#4285f4', className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" className={className}>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>
);

// TrendingUp Icon - for insights
export const TrendingUpIcon: React.FC<IconProps> = ({ size = 24, color = '#4285f4', className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" className={className}>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
        <polyline points="17 6 23 6 23 12"></polyline>
    </svg>
);

interface IconBoxProps {
    icon: React.ReactNode;
    className?: string;
}

export const IconBox: React.FC<IconBoxProps> = ({ icon, className = '' }) => (
    <div className={`icon-box ${className}`}>
        {icon}
    </div>
);

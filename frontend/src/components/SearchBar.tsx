import React from 'react';
import '../pages/Subjects.css';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    onClear?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
    value, 
    onChange, 
    placeholder = 'Search subjects...',
    onClear 
}) => {
    const handleClear = () => {
        onChange('');
        onClear?.();
    };

    return (
        <div className="search-bar-container">
            <div className="search-input-wrapper">
                <span className="search-icon">🔍</span>
                <input
                    type="text"
                    className="search-input"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                />
                {value && (
                    <button 
                        className="search-clear-btn" 
                        onClick={handleClear}
                        title="Clear search"
                    >
                        ✕
                    </button>
                )}
            </div>
            {value && <p className="search-hint">Press Enter to search</p>}
        </div>
    );
};

export default SearchBar;

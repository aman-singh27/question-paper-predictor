import React from 'react';
import '../pages/Subjects.css';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder = 'Search...' }) => {
    return (
        <div className="search-bar-container">
            <input
                type="text"
                className="search-input"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    );
};

export default SearchBar;

import React from 'react';
import '../pages/Landing.css';

interface FeatureCardProps {
    title: string;
    description: string;
    icon?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
    return (
        <div className="feature-card">
            {icon && <div className="feature-icon">{icon}</div>}
            <h3 className="feature-title">{title}</h3>
            <p className="feature-description">{description}</p>
        </div>
    );
};

export default FeatureCard;

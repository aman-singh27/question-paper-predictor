import React, { useState } from 'react';
import '../pages/Landing.css';

interface FeatureCardProps {
    title: string;
    description: string;
    icon?: string | React.ReactNode;
    example?: string;
    insight?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, example, insight }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const isReactNode = React.isValidElement(icon);

    return (
        <div 
            className={`feature-card ${isExpanded ? 'expanded' : ''}`}
            onClick={() => setIsExpanded(!isExpanded)}
        >
            <div className="feature-card-header">
                {icon && (
                    isReactNode ? (
                        <div className="feature-icon-wrapper">{icon}</div>
                    ) : (
                        <div className="feature-icon">{icon}</div>
                    )
                )}
                <div className="feature-text-group">
                    <h3 className="feature-title">{title}</h3>
                    <p className="feature-description">{description}</p>
                </div>
            </div>
            {isExpanded && (example || insight) && (
                <div className="feature-card-expanded">
                    {example && (
                        <div className="expansion-item">
                            <p className="expansion-label">Example:</p>
                            <p className="expansion-content">{example}</p>
                        </div>
                    )}
                    {insight && (
                        <div className="expansion-item">
                            <p className="expansion-label">Key insight:</p>
                            <p className="expansion-content">{insight}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default FeatureCard;

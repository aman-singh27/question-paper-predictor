import React from 'react';
import '../pages/Landing.css';

const InsightPreview: React.FC = () => {
    return (
        <div className="insight-preview-card">
            <h3 className="insight-subject">Operating Systems</h3>
            <div className="insight-topics">
                <div className="insight-topic">
                    <span className="topic-name">Memory Management</span>
                    <span className="topic-percentage">32%</span>
                </div>
                <div className="insight-topic">
                    <span className="topic-name">Process Scheduling</span>
                    <span className="topic-percentage">21%</span>
                </div>
            </div>
            <p className="insight-note">Mostly Subjective questions</p>
        </div>
    );
};

export default InsightPreview;

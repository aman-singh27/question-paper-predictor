import React, { useState } from 'react';
import '../pages/Landing.css';

const InsightPreview: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'overview' | 'topics' | 'trends'>('overview');
    const [tooltipVisible, setTooltipVisible] = useState<string | null>(null);

    const disabledTabs = ['topics', 'trends'];

    const handleTabHover = (tab: string) => {
        if (disabledTabs.includes(tab)) {
            setTooltipVisible(tab);
        }
    };

    return (
        <div className="insight-preview-container">
            <div className="insight-tabs">
                <button 
                    className={`insight-tab ${activeTab === 'overview' ? 'active' : ''}`}
                    onClick={() => setActiveTab('overview')}
                >
                    Overview
                </button>
                <button 
                    className={`insight-tab disabled`}
                    disabled
                    onMouseEnter={() => handleTabHover('topics')}
                    onMouseLeave={() => setTooltipVisible(null)}
                >
                    Topic Breakdown
                    {tooltipVisible === 'topics' && (
                        <span className="tab-tooltip">Available when more data is added</span>
                    )}
                </button>
                <button 
                    className={`insight-tab disabled`}
                    disabled
                    onMouseEnter={() => handleTabHover('trends')}
                    onMouseLeave={() => setTooltipVisible(null)}
                >
                    Trends
                    {tooltipVisible === 'trends' && (
                        <span className="tab-tooltip">Available when more data is added</span>
                    )}
                </button>
            </div>

            <div className="insight-preview-card">
                <h3 className="insight-subject">Operating Systems</h3>
                <div className="insight-topics">
                    <div className="insight-topic">
                        <div className="topic-content">
                            <span className="topic-name">Memory Management</span>
                            <div className="topic-bar">
                                <div className="bar-fill" style={{width: '32%'}}></div>
                            </div>
                        </div>
                        <span className="topic-percentage">32%</span>
                    </div>
                    <div className="insight-topic">
                        <div className="topic-content">
                            <span className="topic-name">Process Scheduling</span>
                            <div className="topic-bar">
                                <div className="bar-fill" style={{width: '21%'}}></div>
                            </div>
                        </div>
                        <span className="topic-percentage">21%</span>
                    </div>
                    <div className="insight-topic">
                        <div className="topic-content">
                            <span className="topic-name">File Systems</span>
                            <div className="topic-bar">
                                <div className="bar-fill" style={{width: '18%'}}></div>
                            </div>
                        </div>
                        <span className="topic-percentage">18%</span>
                    </div>
                </div>
                <p className="insight-note">Based on analysis of 87 exam papers (2019-2024)</p>
                <p className="insight-metadata">Mostly Subjective questions • Updated 2 weeks ago</p>
            </div>
        </div>
    );
};

export default InsightPreview;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebaseClient';
import { getSubjectInsights } from '../services/api';
import InsightCard from '../components/InsightCard';
import InsightRow from '../components/InsightRow';
import ContributionCTA from '../components/ContributionCTA';
import UploadModal from '../components/UploadModal';
import LoadingState from '../components/states/LoadingState';
import EmptyState from '../components/states/EmptyState';
import ErrorState from '../components/states/ErrorState';
import { generatePracticePaper, formatPaperAsText } from '../utils/paperGenerator';
import './SubjectInsights.css';

interface Insights {
    subject: string;
    computedAt: string;
    paperCount: number;
    examSpan?: { start: string; end: string };
    mostAskedTopic: {
        byCount: string;
        byMarks: string;
    };
    topicWeightage: Record<string, number>;
    questionTypeDistribution: Record<string, number>;
    topicQuestionTypeMap: Record<string, string>;
    yearlyTrends: Record<string, string[]>;
}

const SubjectInsights: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [insights, setInsights] = useState<Insights | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string>('');
    const [uploadModalOpen, setUploadModalOpen] = useState(false);

    useEffect(() => {
        if (id) {
            fetchInsights(id);
        }
        // Get user email for avatar
        const user = auth.currentUser;
        if (user?.email) {
            setUserEmail(user.email);
        }
    }, [id]);

    const fetchInsights = async (subjectId: string) => {
        try {
            setLoading(true);
            const data = await getSubjectInsights(subjectId);
            setInsights(data);
            setError(null);
        } catch (err: any) {
            if (err.message === 'Subject insights not available') {
                setError('no-data');
            } else {
                setError('failed');
            }
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getUserInitials = (email: string) => {
        return email.charAt(0).toUpperCase();
    };

    const getLastUpdated = (computedAt: string) => {
        const date = new Date(computedAt);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'today';
        if (diffDays === 1) return '1 day ago';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return date.toLocaleDateString();
    };

    const isBootstrapping = insights ? insights.paperCount < 5 : false;

    const handleGeneratePaper = () => {
        if (!insights) return;

        // Generate the paper
        const paper = generatePracticePaper(insights.subject, insights);
        const paperText = formatPaperAsText(paper);

        // Create a blob and download
        const blob = new Blob([paperText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${insights.subject.replace(/\s+/g, '_')}_Practice_Paper.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };


    // Loading State - Skeleton
    if (loading) {
        return (
            <div className="insights-page">
                <header className="insights-header">
                    <div className="header-left">
                        <h1 className="app-name">Exam Intelligence</h1>
                    </div>
                    <div className="header-center">
                        <button className="back-button" onClick={() => navigate('/subjects')}>
                            ← Subjects
                        </button>
                    </div>
                    <div className="header-right">
                        <div className="user-avatar">
                            <span>{userEmail ? getUserInitials(userEmail) : 'U'}</span>
                        </div>
                    </div>
                </header>

                <div className="insights-container">
                    <LoadingState variant="subject-insights" />
                </div>
            </div>
        );
    }

    // Error State - Failed to load
    if (error === 'failed') {
        return (
            <div className="insights-page">
                <header className="insights-header">
                    <div className="header-left">
                        <h1 className="app-name">Exam Intelligence</h1>
                    </div>
                    <div className="header-center">
                        <button className="back-button" onClick={() => navigate('/subjects')}>
                            ← Subjects
                        </button>
                    </div>
                    <div className="header-right">
                        <div className="user-avatar">
                            <span>{userEmail ? getUserInitials(userEmail) : 'U'}</span>
                        </div>
                    </div>
                </header>

                <div className="insights-container">
                    <ErrorState onRetry={() => id && fetchInsights(id)} />
                </div>
            </div>
        );
    }

    // No Data State - Bootstrapping with no insights
    if (error === 'no-data') {
        return (
            <div className="insights-page">
                <header className="insights-header">
                    <div className="header-left">
                        <h1 className="app-name">Exam Intelligence</h1>
                    </div>
                    <div className="header-center">
                        <button className="back-button" onClick={() => navigate('/subjects')}>
                            ← Subjects
                        </button>
                    </div>
                    <div className="header-right">
                        <div className="user-avatar">
                            <span>{userEmail ? getUserInitials(userEmail) : 'U'}</span>
                        </div>
                    </div>
                </header>

                <div className="insights-container">
                    <EmptyState
                        title="Not enough data to generate insights."
                        message="Upload past exam papers to help build subject intelligence."
                        actionLabel="Contribute an Exam Paper"
                        onAction={() => setUploadModalOpen(true)}
                    />
                </div>
            </div>
        );
    }

    if (!insights) return null;

    // Main Content
    return (
        <div className="insights-page">
            <header className="insights-header">
                <div className="header-left">
                    <h1 className="app-name">Exam Intelligence</h1>
                </div>
                <div className="header-center">
                    <button className="back-button" onClick={() => navigate('/subjects')}>
                        ← Subjects
                    </button>
                </div>
                <div className="header-right">
                    <div className="user-avatar" onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }}>
                        <span>{userEmail ? getUserInitials(userEmail) : 'U'}</span>
                    </div>
                </div>
            </header>

            <div className="insights-container">
                {/* Subject Overview Card */}
                <div className="overview-card">
                    <h2 className="subject-name">{insights.subject}</h2>
                    <p className="subject-subtitle">
                        Insights based on {insights.paperCount} past exam papers
                    </p>
                    <div className="meta-row">
                        <span className="meta-item">
                            Exam span: {insights.examSpan ? `${insights.examSpan.start} – ${insights.examSpan.end}` : '2021 – 2024'}
                        </span>
                        <span className="meta-divider">•</span>
                        <span className="meta-item">
                            Last updated: {getLastUpdated(insights.computedAt)}
                        </span>
                    </div>
                    <div className={`readiness-indicator ${isBootstrapping ? 'bootstrapping' : 'ready'}`}>
                        {isBootstrapping
                            ? 'Insights are based on limited data and will improve as more papers are added'
                            : 'Insights are statistically reliable'}
                    </div>
                    <button className="generate-paper-btn" onClick={handleGeneratePaper}>
                        📄 Generate Practice Paper
                    </button>
                </div>

                {/* Insight Sections */}
                <div className="insights-content">
                    {/* 1. Most Asked Topics */}
                    <InsightCard title="Most Asked Topics">
                        <div className="most-asked-grid">
                            <div className="most-asked-block">
                                <h4>By Frequency</h4>
                                <p className="topic-highlight">{insights.mostAskedTopic.byCount}</p>
                            </div>
                            <div className="most-asked-block">
                                <h4>By Marks</h4>
                                <p className="topic-highlight">{insights.mostAskedTopic.byMarks}</p>
                            </div>
                        </div>
                    </InsightCard>

                    {/* 2. Topic-Wise Weightage */}
                    <InsightCard title="Topic Weightage">
                        <div className="weightage-list">
                            {Object.entries(insights.topicWeightage)
                                .sort(([, a], [, b]) => b - a)
                                .map(([topic, percentage]) => (
                                    <InsightRow key={topic} label={topic} value={`${percentage}%`} />
                                ))}
                        </div>
                    </InsightCard>

                    {/* 3. Question Type Distribution */}
                    <InsightCard title="Question Type Distribution">
                        <div className="distribution-list">
                            {Object.entries(insights.questionTypeDistribution).map(([type, percentage]) => (
                                <InsightRow key={type} label={type} value={`${percentage}%`} />
                            ))}
                        </div>
                    </InsightCard>

                    {/* 4. Question Pattern per Topic */}
                    <InsightCard title="Question Patterns by Topic">
                        <div className="patterns-table">
                            <div className="table-header">
                                <span className="table-col-topic">Topic</span>
                                <span className="table-col-type">Most Common Question Type</span>
                            </div>
                            {Object.entries(insights.topicQuestionTypeMap).map(([topic, type]) => (
                                <div key={topic} className="table-row">
                                    <span className="table-col-topic">{topic}</span>
                                    <span className="table-col-type">{type}</span>
                                </div>
                            ))}
                        </div>
                    </InsightCard>

                    {/* 5. Year-Wise Trends */}
                    <InsightCard title="Trends Over Time">
                        <div className="trends-list">
                            {Object.entries(insights.yearlyTrends)
                                .sort(([a], [b]) => b.localeCompare(a))
                                .map(([year, topics]) => (
                                    <div key={year} className="trend-block">
                                        <h4 className="trend-year">{year}</h4>
                                        <p className="trend-topics">{topics.join(', ')}</p>
                                    </div>
                                ))}
                        </div>
                    </InsightCard>
                </div>

                {/* Contribution CTA */}
                <ContributionCTA
                    isBootstrapping={isBootstrapping}
                    onContribute={() => setUploadModalOpen(true)}
                />
            </div>

            {/* Upload Modal */}
            <UploadModal
                isOpen={uploadModalOpen}
                onClose={() => setUploadModalOpen(false)}
                subjectId={id || ''}
                isBootstrapping={isBootstrapping}
            />
        </div>
    );
};

export default SubjectInsights;

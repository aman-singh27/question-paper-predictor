import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import InsightPreview from '../components/InsightPreview';
import { DocumentIcon, BooksIcon, RefreshIcon, UploadIcon, ZapIcon, BarChartIcon, IconBox } from '../components/Icons';
import './Landing.css';

const Landing: React.FC = () => {
    const navigate = useNavigate();
    const [dismissedTip, setDismissedTip] = useState(false);

    const handleDismissTip = () => {
        setDismissedTip(true);
        localStorage.setItem('landing-tip-dismissed', 'true');
    };

    React.useEffect(() => {
        const wasDismissed = localStorage.getItem('landing-tip-dismissed');
        if (wasDismissed) {
            setDismissedTip(true);
        }
    }, []);

    return (
        <div className="landing-page">
            {/* Hero Section */}
            <Hero />

            {/* Problem Section */}
            <section className="problem-section">
                <h2 className="section-title">Why students study inefficiently</h2>
                <div className="feature-grid">
                    <FeatureCard
                        icon={<IconBox icon={<DocumentIcon size={32} />} />}
                        title="Random PYQs give partial picture"
                        description="Individual past papers don't show patterns across years"
                        example="A topic might appear in 2019, 2021, and 2023 exams, but studying random papers misses this pattern."
                        insight="87% of recurring topics are studied only 40% of the time"
                    />
                    <FeatureCard
                        icon={<IconBox icon={<BooksIcon size={32} />} />}
                        title="Syllabus doesn't show exam weightage"
                        description="Course outlines don't tell you what actually appears in exams"
                        example="While OS syllabus lists 15 topics equally, exams heavily focus on Memory Management and Process Scheduling."
                        insight="Actual exam distribution differs from syllabus by up to 60%"
                    />
                    <FeatureCard
                        icon={<IconBox icon={<RefreshIcon size={32} />} />}
                        title="Repeated questions go unnoticed"
                        description="Important topics that appear every year are easy to miss"
                        example="File System concepts appeared in 5 consecutive years but students often skip them."
                        insight="Top recurring questions account for 45% of total marks"
                    />
                </div>
            </section>

            {/* Solution Section */}
            <section className="solution-section">
                <h2 className="section-title">How it works</h2>
                <p className="scroll-hint">Scroll to see it in action ↓</p>
                <div className="solution-flow">
                    <div className="solution-step">
                        <div className="step-icon-box">
                            <UploadIcon size={40} />
                        </div>
                        <h3 className="step-title">Upload / Select subject</h3>
                        <p className="step-description">Choose from available subjects or upload papers</p>
                    </div>
                    <div className="flow-connector">
                        <div className="animated-arrow"></div>
                    </div>
                    <div className="solution-step">
                        <div className="step-icon-box">
                            <ZapIcon size={40} />
                        </div>
                        <h3 className="step-title">AI analyzes past exams</h3>
                        <p className="step-description">Google AI processes years of exam data</p>
                    </div>
                    <div className="flow-connector">
                        <div className="animated-arrow"></div>
                    </div>
                    <div className="solution-step">
                        <div className="step-icon-box">
                            <BarChartIcon size={40} />
                        </div>
                        <h3 className="step-title">You get topic-wise insights</h3>
                        <p className="step-description">See what topics matter most for your exam</p>
                    </div>
                </div>
            </section>

            {/* Example Insight Preview */}
            <section className="preview-section">
                <h2 className="section-title">Example Insight</h2>
                <InsightPreview />
            </section>

            {/* Guided User Flow Tip */}
            {!dismissedTip && (
                <section className="user-flow-tip">
                    <div className="tip-content">
                        <div className="tip-icon">💡</div>
                        <div className="tip-text">
                            <p className="tip-title">Tip: Start with the subject you find hardest</p>
                            <p className="tip-description">Analyze challenging subjects first to identify weak topics and improve faster.</p>
                        </div>
                        <button 
                            className="tip-close"
                            onClick={handleDismissTip}
                            aria-label="Dismiss tip"
                        >
                            ✕
                        </button>
                    </div>
                </section>
            )}

            {/* Trust Strip */}
            <section className="trust-strip">
                <p className="trust-text">Powered by leading AI & cloud technology</p>
                <div className="trust-icons">
                    <div className="trust-icon">🔒 Secure by design</div>
                    <div className="trust-icon">☁️ Google Cloud</div>
                    <div className="trust-icon">⚡ Firebase</div>
                    <div className="trust-icon">🤖 Gemini AI</div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="final-cta-section">
                <button
                    className="cta-secondary"
                    onClick={() => navigate('/login')}
                >
                    View available subjects
                </button>
            </section>
        </div>
    );
};

export default Landing;

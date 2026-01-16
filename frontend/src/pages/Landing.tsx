import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../config/firebaseClient';
import { useAuth } from '../context/AuthContext';
import FeatureCard from '../components/FeatureCard';
import InsightPreview from '../components/InsightPreview';
import { DocumentIcon, BooksIcon, RefreshIcon, UploadIcon, ZapIcon, BarChartIcon, IconBox } from '../components/Icons';
import heroImage from '../assets/hero_1.png';
import './Landing.css';

const Landing: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [dismissedTip, setDismissedTip] = useState(false);

    const handleDismissTip = () => {
        setDismissedTip(true);
        // Store in memory instead of localStorage
        sessionStorage.setItem('landing-tip-dismissed', 'true');
    };

    const handleGetStarted = async () => {
        if (user) {
            navigate('/branches');
            return;
        }

        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            navigate('/branches');
        } catch (error) {
            console.error('Sign-in error:', error);
        }
    };

    useEffect(() => {
        const wasDismissed = sessionStorage.getItem('landing-tip-dismissed');
        if (wasDismissed) {
            setDismissedTip(true);
        }
    }, []);

    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <div className="hero-split-layout">
                        <div className="hero-text-column">
                            <h1 className="hero-headline">Unlock Exam Success with AI-Powered Insights</h1>
                            <p className="hero-subheadline">Stop guessing, start knowing. Discover the high-value topics that actually appear in your exams.</p>
                            <div className="hero-cta-group">
                                <button className="cta-button primary" onClick={handleGetStarted}>Get Started Free</button>
                            </div>
                        </div>
                        {/* RIGHT SIDE: Visual Intelligence Showcase */}
                        <div className="hero-visual-column">
                            <div className="hero-image-container">
                                <img src={heroImage} alt="Exam Intelligence Analytics Dashboard" className="hero-dashboard-image" />
                                <div className="hero-image-glow"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem Section */}
            <section className="problem-section">
                <h2 className="section-title">Study smarter, not harder</h2>
                <div className="feature-grid">
                    <FeatureCard
                        icon={<IconBox icon={<DocumentIcon size={28} />} />}
                        title="Random papers miss patterns"
                        description="Individual past papers don't reveal what actually matters across years"
                        example="A critical topic appears in 2019, 2021, and 2023—but studying papers randomly means you'll likely miss it."
                        insight="Students miss 87% of recurring high-value topics"
                    />
                    <FeatureCard
                        icon={<IconBox icon={<BooksIcon size={28} />} />}
                        title="Syllabus hides what counts"
                        description="Course outlines list topics equally, but exams have clear favorites"
                        example="Your OS syllabus lists 15 topics. Exams focus heavily on just 3: Memory Management, Process Scheduling, and File Systems."
                        insight="Exam focus differs from syllabus by up to 60%"
                    />
                    <FeatureCard
                        icon={<IconBox icon={<RefreshIcon size={28} />} />}
                        title="High-value topics stay hidden"
                        description="Questions that appear every year are easy to overlook"
                        example="File System implementation has appeared in 5 consecutive exams—most students discover this too late."
                        insight="Top recurring topics account for 45% of marks"
                    />
                </div>
            </section>

            {/* Solution Section */}
            <section className="solution-section">
                <h2 className="section-title">How it works</h2>
                <p className="scroll-hint">Three steps to smarter preparation</p>
                <div className="solution-flow">
                    <div className="solution-step">
                        <div className="step-icon-box">
                            <UploadIcon size={40} />
                        </div>
                        <h3 className="step-title">Choose your subject</h3>
                        <p className="step-description">Select from available subjects or upload your college papers</p>
                    </div>
                    <div className="flow-connector">
                        <div className="animated-arrow"></div>
                    </div>
                    <div className="solution-step">
                        <div className="step-icon-box">
                            <ZapIcon size={40} />
                        </div>
                        <h3 className="step-title">AI analyzes patterns</h3>
                        <p className="step-description">Advanced algorithms identify what actually appears in exams</p>
                    </div>
                    <div className="flow-connector">
                        <div className="animated-arrow"></div>
                    </div>
                    <div className="solution-step">
                        <div className="step-icon-box">
                            <BarChartIcon size={40} />
                        </div>
                        <h3 className="step-title">Get topic insights</h3>
                        <p className="step-description">See exactly what to focus on for maximum impact</p>
                    </div>
                </div>
            </section>

            {/* Example Insight Preview */}
            <section className="preview-section">
                <h2 className="section-title">See what you'll get</h2>
                <InsightPreview />
            </section>

            {/* Guided User Flow Tip */}
            {!dismissedTip && (
                <section className="user-flow-tip">
                    <div className="tip-content">
                        <div className="tip-icon">💡</div>
                        <div className="tip-text">
                            <p className="tip-title">Start with your toughest subject</p>
                            <p className="tip-description">Analyzing difficult subjects first reveals weak areas and helps you improve faster.</p>
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
                <p className="trust-text">Powered by industry-leading technology</p>
                <div className="trust-icons">
                    <div className="trust-icon">🔒 Secure</div>
                    <div className="trust-icon">☁️ Cloud-based</div>
                    <div className="trust-icon">⚡ Lightning fast</div>
                    <div className="trust-icon">🤖 AI-powered</div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="final-cta-section">
                <button
                    className="cta-secondary"
                    onClick={() => navigate('/login')}
                >
                    Get started
                </button>
            </section>
        </div>
    );
};

export default Landing;
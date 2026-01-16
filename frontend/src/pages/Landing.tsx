import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import InsightPreview from '../components/InsightPreview';
import './Landing.css';

const Landing: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-page">
            {/* Hero Section */}
            <Hero />

            {/* Problem Section */}
            <section className="problem-section">
                <h2 className="section-title">Why students study inefficiently</h2>
                <div className="feature-grid">
                    <FeatureCard
                        icon="📄"
                        title="Random PYQs give partial picture"
                        description="Individual past papers don't show patterns across years"
                    />
                    <FeatureCard
                        icon="📚"
                        title="Syllabus doesn't show exam weightage"
                        description="Course outlines don't tell you what actually appears in exams"
                    />
                    <FeatureCard
                        icon="🔄"
                        title="Repeated questions go unnoticed"
                        description="Important topics that appear every year are easy to miss"
                    />
                </div>
            </section>

            {/* Solution Section */}
            <section className="solution-section">
                <h2 className="section-title">How it works</h2>
                <div className="solution-flow">
                    <div className="solution-step">
                        <div className="step-icon">📤</div>
                        <h3 className="step-title">Upload / Select subject</h3>
                        <p className="step-description">Choose from available subjects or upload papers</p>
                    </div>
                    <div className="flow-arrow">→</div>
                    <div className="solution-step">
                        <div className="step-icon">🤖</div>
                        <h3 className="step-title">AI analyzes past exams</h3>
                        <p className="step-description">Google AI processes years of exam data</p>
                    </div>
                    <div className="flow-arrow">→</div>
                    <div className="solution-step">
                        <div className="step-icon">📊</div>
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

            {/* Google Tech Trust Section */}
            <section className="tech-section">
                <p className="tech-text">Built using Google Cloud, Firebase, and Gemini</p>
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

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/Landing.css';

const Hero: React.FC = () => {
    const navigate = useNavigate();

    return (
        <section className="hero-section">
            <div className="hero-content">
                <h1 className="hero-headline">Stop guessing what to study.</h1>
                <h2 className="hero-subheadline">
                    Analyze real past exam papers to see what actually matters.
                </h2>
                <p className="hero-supporting">
                    Built using Google AI. Powered by real exam data.
                </p>
                <button
                    className="cta-primary"
                    onClick={() => navigate('/login')}
                >
                    Get Started with Google
                </button>
            </div>
        </section>
    );
};

export default Hero;

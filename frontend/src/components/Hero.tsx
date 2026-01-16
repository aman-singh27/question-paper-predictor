import { useNavigate } from 'react-router-dom';
import '../pages/Landing.css';

const Hero: React.FC = () => {
    const navigate = useNavigate();

    const handleDemo = () => {
        // Scroll to preview section
        const previewSection = document.querySelector('.preview-section');
        if (previewSection) {
            previewSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleSampleInsights = () => {
        // Scroll to preview section
        const previewSection = document.querySelector('.preview-section');
        if (previewSection) {
            previewSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

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
                <div className="hero-cta-group">
                    <button
                        className="cta-primary"
                        onClick={() => navigate('/login')}
                    >
                        Get Started with Google
                    </button>
                    <div className="hero-secondary-actions">
                        <button
                            className="hero-text-action"
                            onClick={handleDemo}
                        >
                            View demo
                        </button>
                        <span className="action-divider">•</span>
                        <button
                            className="hero-text-action"
                            onClick={handleSampleInsights}
                        >
                            See sample insights
                        </button>
                    </div>
                </div>
            </div>
            <div className="hero-visual-anchor">
                <div className="grid-pattern"></div>
                <div className="card-ghost card-1"></div>
                <div className="card-ghost card-2"></div>
                <div className="chart-mock"></div>
            </div>
        </section>
    );
};

export default Hero;

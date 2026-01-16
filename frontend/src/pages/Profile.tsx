import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebaseClient';
import { getUserContributions } from '../services/api';
import ProfileCard from '../components/ProfileCard';
import ContributionCard from '../components/ContributionCard';
import LoadingState from '../components/states/LoadingState';
import EmptyState from '../components/states/EmptyState';
import ErrorState from '../components/states/ErrorState';
import './Profile.css';

interface Contribution {
    paperId: string;
    subjectName: string;
    examYear?: string;
    status: 'used' | 'duplicate';
    uploadedAt: string;
}

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const [contributions, setContributions] = useState<Contribution[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhoto, setUserPhoto] = useState('');

    useEffect(() => {
        // Get user info
        const user = auth.currentUser;
        if (user) {
            setUserName(user.displayName || 'User');
            setUserEmail(user.email || '');
            setUserPhoto(user.photoURL || '');
        }

        fetchContributions();
    }, []);

    const fetchContributions = async () => {
        try {
            setLoading(true);
            const data = await getUserContributions();
            setContributions(data);
            setError(false);
        } catch (err) {
            console.error('Failed to fetch contributions:', err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const getUserInitials = (email: string) => {
        return email.charAt(0).toUpperCase();
    };

    return (
        <div className="profile-page">
            <header className="profile-header">
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

            <div className="profile-container">
                {/* Profile Summary Card */}
                <ProfileCard
                    name={userName}
                    email={userEmail}
                    photoURL={userPhoto}
                    contributionCount={contributions.length}
                />

                {/* Contributions Section */}
                <div className="contributions-section">
                    <h3 className="contributions-title">Your Contributions</h3>

                    {loading ? (
                        <div className="contributions-loading">
                            <LoadingState variant="subjects-grid" />
                        </div>
                    ) : error ? (
                        <ErrorState onRetry={fetchContributions} />
                    ) : contributions.length === 0 ? (
                        <EmptyState
                            title="You haven't contributed any exam papers yet."
                            message="Contributions help improve insights for everyone."
                        />
                    ) : (
                        <div className="contributions-list">
                            {contributions.map((contribution) => (
                                <ContributionCard
                                    key={contribution.paperId}
                                    subjectName={contribution.subjectName}
                                    examYear={contribution.examYear}
                                    status={contribution.status}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;

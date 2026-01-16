import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebaseClient';
import { branches } from '../data/mockData';
import './Branches.css';

const Branches: React.FC = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = React.useState('');
    const [userPhoto, setUserPhoto] = React.useState('');

    React.useEffect(() => {
        const user = auth.currentUser;
        if (user?.email) {
            setUserEmail(user.email);
            setUserPhoto(user.photoURL || '');
        }
    }, []);

    const getUserInitials = (email: string) => {
        return email.charAt(0).toUpperCase();
    };

    return (
        <div className="branches-page">
            <header className="branches-header">
                <div className="header-left">
                    <button className="back-button" onClick={() => navigate('/')}>
                        <span className="back-icon">←</span> Back to Home
                    </button>
                </div>
                <div className="header-right">
                    <div className="user-avatar" onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }}>
                        {userPhoto ? (
                            <img src={userPhoto} alt="User" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                        ) : (
                            <span>{userEmail ? getUserInitials(userEmail) : 'U'}</span>
                        )}
                    </div>
                </div>
            </header>

            <div className="branches-container">
                <div className="page-header">
                    <h2>Select Your Branch</h2>
                    <p>Choose your engineering branch to view year-wise subjects</p>
                </div>

                <div className="branches-grid">
                    {branches.map((branch) => (
                        <div
                            key={branch.id}
                            className={`branch-card ${branch.comingSoon ? 'coming-soon' : ''}`}
                            onClick={() => !branch.comingSoon && navigate(`/branch/${branch.id}`)}
                        >
                            <div className="branch-code">{branch.code}</div>
                            <h3 className="branch-name">{branch.name}</h3>
                            <p className="branch-description">{branch.description}</p>
                            {branch.comingSoon && (
                                <div className="coming-soon-badge">Coming Soon</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Branches;

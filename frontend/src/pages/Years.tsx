import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebaseClient';
import { yearsByBranch } from '../data/mockData';
import './Years.css';

const Years: React.FC = () => {
    const { branchId } = useParams<{ branchId: string }>();
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = React.useState('');
    const [userPhoto, setUserPhoto] = React.useState('');

    const years = branchId ? yearsByBranch[branchId] || [] : [];

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
        <div className="years-page">
            <header className="years-header">
                <div className="header-left">
                    <h1 className="app-name">Exam Intelligence</h1>
                </div>
                <div className="header-center">
                    <button className="back-button" onClick={() => navigate('/branches')}>
                        ← Branches
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

            <div className="years-container">
                <div className="page-header">
                    <h2>Select Academic Year</h2>
                    <p>Choose your year to view subjects and exam papers</p>
                </div>

                <div className="years-list">
                    {years.map((year, index) => (
                        <div
                            key={year.id}
                            className="year-card"
                            onClick={() => navigate(`/branch/${branchId}/year/${year.id}`)}
                        >
                            <div className="year-number">{index + 1}</div>
                            <div className="year-content">
                                <h3 className="year-name">{year.name}</h3>
                                <p className="year-subtitle">{year.subtitle}</p>
                                <p className="year-description">{year.description}</p>
                            </div>
                            <div className="year-arrow">→</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Years;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebaseClient';
import { subjectsByYear } from '../data/mockData';
import SearchBar from '../components/SearchBar';
import SubjectCard from '../components/SubjectCard';
import LoadingState from '../components/states/LoadingState';
import EmptyState from '../components/states/EmptyState';
import ErrorState from '../components/states/ErrorState';
import './Subjects.css';

interface Subject {
    id: string;
    name: string;
    status: 'ready' | 'coming-soon';
    paperCount?: number;
    category: string;
}

const Subjects: React.FC = () => {
    const { branchId, yearId } = useParams<{ branchId: string; yearId: string }>();
    const navigate = useNavigate();
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string>('');
    const [userPhoto, setUserPhoto] = useState<string>('');

    useEffect(() => {
        loadSubjects();
        const user = auth.currentUser;
        if (user?.email) {
            setUserEmail(user.email);
            setUserPhoto(user.photoURL || '');
        }
    }, [yearId]);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredSubjects(subjects);
        } else {
            const filtered = subjects.filter((subject) =>
                subject.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredSubjects(filtered);
        }
    }, [searchQuery, subjects]);

    const loadSubjects = () => {
        try {
            setLoading(true);
            const yearSubjects = yearId ? subjectsByYear[yearId] || [] : [];
            setSubjects(yearSubjects);
            setFilteredSubjects(yearSubjects);
            setError(null);
        } catch (err) {
            setError('error');
            console.error(err);
        } finally {
            setTimeout(() => setLoading(false), 300); // Simulate loading
        }
    };

    const handleSubjectClick = (subjectId: string, status: string) => {
        if (status === 'coming-soon') return; // Don't navigate for coming soon
        navigate(`/subject/${subjectId}`);
    };

    const getUserInitials = (email: string) => {
        return email.charAt(0).toUpperCase();
    };

    // Group subjects by category
    const groupedSubjects = filteredSubjects.reduce((acc, subject) => {
        if (!acc[subject.category]) {
            acc[subject.category] = [];
        }
        acc[subject.category].push(subject);
        return acc;
    }, {} as Record<string, Subject[]>);

    // Loading state - skeleton cards
    if (loading) {
        return (
            <div className="subjects-page">
                <header className="subjects-header">
                    <div className="header-left">
                        <h1 className="app-name">Exam Intelligence</h1>
                    </div>
                    <div className="header-right">
                        <button className="contributions-btn" disabled>
                            My Contributions
                        </button>
                        <div className="user-avatar" onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }}>
                            {userPhoto ? (
                                <img src={userPhoto} alt="User" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                            ) : (
                                <span>{userEmail ? getUserInitials(userEmail) : 'U'}</span>
                            )}
                        </div>
                    </div>
                </header>

                <div className="subjects-container">
                    <div className="page-title-section">
                        <h2 className="page-title">Available Subjects</h2>
                        <p className="page-subtitle">
                            Explore exam patterns built from real past papers.
                        </p>
                    </div>

                    <LoadingState variant="subjects-grid" />
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="subjects-page">
                <header className="subjects-header">
                    <div className="header-left">
                        <h1 className="app-name">Exam Intelligence</h1>
                    </div>
                    <div className="header-right">
                        <button className="contributions-btn" disabled>
                            My Contributions
                        </button>
                        <div className="user-avatar">
                            <span>{userEmail ? getUserInitials(userEmail) : 'U'}</span>
                        </div>
                    </div>
                </header>

                <div className="subjects-container">
                    <ErrorState onRetry={loadSubjects} />
                </div>
            </div>
        );
    }

    // Empty state
    if (subjects.length === 0) {
        return (
            <div className="subjects-page">
                <header className="subjects-header">
                    <div className="header-left">
                        <h1 className="app-name">Exam Intelligence</h1>
                    </div>
                    <div className="header-right">
                        <button className="contributions-btn" disabled>
                            My Contributions
                        </button>
                        <div className="user-avatar">
                            <span>{userEmail ? getUserInitials(userEmail) : 'U'}</span>
                        </div>
                    </div>
                </header>

                <div className="subjects-container">
                    <EmptyState
                        title="No subjects available yet."
                        message="Be the first to contribute an exam paper and unlock insights."
                        actionLabel="Contribute a Paper"
                        actionDisabled={true}
                    />
                </div>
            </div>
        );
    }

    // Main content
    return (
        <div className="subjects-page">
            <header className="subjects-header">
                <div className="header-left">
                    <button className="back-button" onClick={() => navigate(`/branch/${branchId}`)}>
                        <span className="back-icon">←</span> Back
                    </button>
                </div>
                <div className="header-right">
                    <button className="contributions-btn" disabled>
                        My Contributions
                    </button>
                    <div className="user-avatar" onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }}>
                        {userPhoto ? (
                            <img src={userPhoto} alt="User" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                        ) : (
                            <span>{userEmail ? getUserInitials(userEmail) : 'U'}</span>
                        )}
                    </div>
                </div>
            </header>

            <div className="subjects-container">
                <div className="page-title-section">
                    <h2 className="page-title">Available Subjects</h2>
                    <p className="page-subtitle">
                        Explore exam patterns built from real past papers.
                    </p>
                </div>

                <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Search by subject name…"
                />

                {filteredSubjects.length === 0 ? (
                    <div className="no-results">
                        <p>No subjects found matching "{searchQuery}"</p>
                    </div>
                ) : (
                    <div className="subjects-grid">
                        {filteredSubjects.map((subject) => (
                            <SubjectCard
                                key={subject.id}
                                subject={subject}
                                onClick={() => handleSubjectClick(subject.id, subject.status)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Subjects;

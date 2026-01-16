import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebaseClient';
import { getSubjects } from '../services/api';
import SearchBar from '../components/SearchBar';
import SubjectCard from '../components/SubjectCard';
import LoadingState from '../components/states/LoadingState';
import EmptyState from '../components/states/EmptyState';
import ErrorState from '../components/states/ErrorState';
import './Subjects.css';

interface Subject {
    subjectId: string;
    subject: string;
    paperCount: number;
    status: 'ready' | 'bootstrapping';
}

const Subjects: React.FC = () => {
    const navigate = useNavigate();
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string>('');

    useEffect(() => {
        fetchSubjects();
        // Get user email for avatar
        const user = auth.currentUser;
        if (user?.email) {
            setUserEmail(user.email);
        }
    }, []);

    useEffect(() => {
        // Client-side filtering (case-insensitive)
        if (searchQuery.trim() === '') {
            setFilteredSubjects(subjects);
        } else {
            const filtered = subjects.filter((subject) =>
                subject.subject.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredSubjects(filtered);
        }
    }, [searchQuery, subjects]);

    const fetchSubjects = async () => {
        try {
            setLoading(true);
            const data = await getSubjects();
            setSubjects(data);
            setFilteredSubjects(data);
            setError(null);
        } catch (err) {
            setError('error');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubjectClick = (subjectId: string) => {
        // Navigate to subject insights for both Ready and Bootstrapping
        navigate(`/subject/${subjectId}`);
    };

    const getUserInitials = (email: string) => {
        return email.charAt(0).toUpperCase();
    };

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
                        <div className="user-avatar">
                            <span>{userEmail ? getUserInitials(userEmail) : 'U'}</span>
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
                    <ErrorState onRetry={fetchSubjects} />
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
                    <h1 className="app-name">Exam Intelligence</h1>
                </div>
                <div className="header-right">
                    <button className="contributions-btn" disabled>
                        My Contributions
                    </button>
                    <div className="user-avatar" onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }}>
                        <span>{userEmail ? getUserInitials(userEmail) : 'U'}</span>
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
                                key={subject.subjectId}
                                subject={subject}
                                onClick={() => handleSubjectClick(subject.subjectId)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Subjects;

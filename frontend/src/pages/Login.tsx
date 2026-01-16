import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../config/firebaseClient';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            navigate('/branches');
        }
    }, [user, navigate]);

    const handleGoogleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            // Navigation handled by useEffect
        } catch (error) {
            console.error('Sign-in error:', error);
            alert('Failed to sign in. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>Exam Intelligence Platform</h1>
                <p>Sign in to view subject insights</p>
                <button onClick={handleGoogleSignIn} className="google-signin-btn">
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};

export default Login;

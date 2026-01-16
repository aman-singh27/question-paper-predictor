import { auth } from '../config/firebaseClient';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ||
    'http://localhost:5001/exam-intelligence-platform/us-central1';

/**
 * Get Firebase ID token for authenticated requests
 */
const getIdToken = async (): Promise<string> => {
    const user = auth.currentUser;
    if (!user) {
        throw new Error('User not authenticated');
    }
    return await user.getIdToken();
};

/**
 * Fetch all subjects with readiness metadata
 */
export const getSubjects = async () => {
    const token = await getIdToken();

    const response = await fetch(`${API_BASE_URL}/getSubjects`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch subjects');
    }

    return await response.json();
};

/**
 * Fetch subject insights by subject ID
 */
export const getSubjectInsights = async (subjectId: string) => {
    const token = await getIdToken();

    const response = await fetch(
        `${API_BASE_URL}/getSubjectInsights?subjectId=${subjectId}`,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }
    );

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('Subject insights not available');
        }
        throw new Error('Failed to fetch subject insights');
    }

    return await response.json();
};

/**
 * Fetch user contributions (uploaded papers)
 */
export const getUserContributions = async () => {
    const token = await getIdToken();

    const response = await fetch(`${API_BASE_URL}/getUserContributions`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user contributions');
    }

    return await response.json();
};

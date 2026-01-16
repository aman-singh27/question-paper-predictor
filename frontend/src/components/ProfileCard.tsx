import React from 'react';
import './ProfileCard.css';

interface ProfileCardProps {
    name: string;
    email: string;
    photoURL?: string;
    contributionCount: number;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, email, photoURL, contributionCount }) => {
    const getUserInitials = (name: string) => {
        return name.charAt(0).toUpperCase();
    };

    return (
        <div className="profile-card">
            <div className="profile-avatar-large">
                {photoURL ? (
                    <img src={photoURL} alt={name} className="avatar-image" />
                ) : (
                    <span className="avatar-initials">{getUserInitials(name)}</span>
                )}
            </div>
            <h2 className="profile-name">{name}</h2>
            <p className="profile-email">{email}</p>
            <p className="profile-contribution-count">
                You've contributed {contributionCount} exam {contributionCount === 1 ? 'paper' : 'papers'}
            </p>
        </div>
    );
};

export default ProfileCard;

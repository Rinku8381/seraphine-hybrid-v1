// TermsModal.tsx

"use client";

import "./TermsScreen.css";

interface TermsScreenProps {
  onAccept: () => void;
  onDecline: () => void;
  isVisible: boolean;
}

export default function TermsScreen({ onAccept, onDecline, isVisible }: TermsScreenProps) {
  return (
    <div className={`terms-screen ${isVisible ? 'visible' : ''}`} tabIndex={-1} role="dialog" aria-modal="true">
      <div className="terms-container">
        <div className="terms-header">
          <h1 className="terms-title">Terms & Conditions</h1>
          <div className="age-restriction">
            <span className="age-badge">18+</span>
            <p className="age-text">This application is restricted to users 18 years and older</p>
          </div>
        </div>

        <div className="terms-content">
          {/* Sections truncated for brevity */}
        </div>

        <div className="terms-actions">
          <button className="decline-button" onClick={onDecline}>Decline</button>
          <button className="accept-button" onClick={onAccept}>Accept & Continue</button>
        </div>
      </div>
    </div>
  );
}
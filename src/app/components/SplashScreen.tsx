import React, { useEffect } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    // Simulate loading for 2 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div style={containerStyle}>
      <div className="spinner" style={spinnerStyle} />
      <p style={textStyle}>Loading...</p>
    </div>
  );
};

const containerStyle = {
  display: 'flex' as const,
  flexDirection: 'column' as const,
  justifyContent: 'center' as const,
  alignItems: 'center' as const,
  height: '100vh',
  backgroundColor: '#ffffff',
} as const;

const spinnerStyle = {
  width: '40px',
  height: '40px',
  border: '4px solid #f3f3f3',
  borderTop: '4px solid #0000ff',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
} as const;

const textStyle = {
  marginTop: '20px',
  fontSize: '16px',
  color: '#000000',
} as const;

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

export default SplashScreen;

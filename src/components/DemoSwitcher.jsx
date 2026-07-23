import { useState } from 'react';
import { useApp } from '../context/AppContext';

const demoSteps = [
  { id: 'splash', label: '1. Splash' },
  { id: 'onboarding', label: '2. Onboarding' },
  { id: 'account-type', label: '3. Salary Account' },
  { id: 'verification', label: '4. Identity Verification' },
  { id: 'quiz', label: '5. Context Quiz' },
  { id: 'dashboard', label: '6. Day 0 Dashboard (Score 0)' },
  { id: 'celebration', label: '7. Salary Trigger 🎉' },
  { id: 'budget', label: '8. Calibrated Budget' },
  { id: 'ai-chat', label: '9. AI Nudge & Goal' },
  { id: 'sip', label: '10. SIP Setup' },
  { id: 'goals', label: '11. Goals Board' },
  { id: 'dashboard-updated', label: '12. Active Dashboard (Score 38)' },
  { id: 'progress', label: '13. Financial Health' },
  { id: 'fin-timeline', label: '14. Fin Story Timeline' },
  { id: 'unlock', label: '15. Bank Unlocks Ladder' },
  { id: 'life-timeline', label: '16. Life Roadmap 🗺️' },
  { id: 'learn', label: '17. Finance Academy 📚' },
  { id: 'module', label: '18. Module Player 📖' },
];

export default function DemoSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentScreen, navigate, finScore, dispatch } = useApp();

  const handleReset = () => {
    dispatch({ type: 'NAVIGATE', screen: 'splash' });
    window.location.reload();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 12,
      right: 12,
      zIndex: 9999,
      fontFamily: 'Inter, sans-serif',
    }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'rgba(10, 14, 39, 0.85)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(79, 124, 255, 0.4)',
          color: '#00d68f',
          padding: '6px 14px',
          borderRadius: '20px',
          fontSize: '0.75rem',
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <span>🎮 Demo Switcher</span>
        <span style={{ fontSize: '0.65rem', opacity: 0.7 }}>({finScore} pts)</span>
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '36px',
          right: 0,
          width: '240px',
          maxHeight: '380px',
          overflowY: 'auto',
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '12px',
          padding: '8px',
          boxShadow: '0 12px 32px rgba(0,0,0,0.6)',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}>
          <div style={{
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--text-muted, #94a3b8)',
            padding: '4px 8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span>Jump to Screen</span>
            <button
              onClick={handleReset}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ff6b6b',
                fontSize: '0.65rem',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Reset Demo
            </button>
          </div>

          {demoSteps.map(step => (
            <button
              key={step.id}
              onClick={() => {
                navigate(step.id);
                setIsOpen(false);
              }}
              style={{
                textAlign: 'left',
                padding: '6px 10px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                border: 'none',
                background: currentScreen === step.id ? 'rgba(79, 124, 255, 0.25)' : 'transparent',
                color: currentScreen === step.id ? '#ffffff' : '#cbd5e1',
                fontWeight: currentScreen === step.id ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {step.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

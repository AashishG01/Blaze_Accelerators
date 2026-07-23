import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function VerificationScreen() {
  const { navigate } = useApp();
  const [phase, setPhase] = useState('form'); // form | verifying | success

  const handleVerify = () => {
    setPhase('verifying');
    setTimeout(() => setPhase('success'), 2300);
  };

  return (
    <section className="screen">
      <h2 className="screen-title">Quick verification</h2>
      <p className="screen-subtitle">We&apos;ll verify your identity in seconds.</p>

      {phase === 'form' && (
        <div className="verify-form">
          <div className="input-group">
            <label>Aadhaar Number</label>
            <input type="text" defaultValue="8765 4321 9012" readOnly />
          </div>
          <div className="input-group">
            <label>PAN Number</label>
            <input type="text" defaultValue="ABCDE1234F" readOnly />
          </div>
          <button className="btn btn-primary" onClick={handleVerify}>
            Verify &amp; Continue
          </button>
        </div>
      )}

      {phase === 'verifying' && (
        <div style={{ marginTop: 'var(--space-xl)' }}>
          <div className="verify-progress active">
            <div className="verify-bar" style={{ width: '100%', transition: 'width 2s ease-in-out' }} />
          </div>
          <p className="text-secondary" style={{ textAlign: 'center', marginTop: 'var(--space-lg)' }}>
            Verifying your identity...
          </p>
        </div>
      )}

      {phase === 'success' && (
        <div className="verify-success show">
          <div className="verify-checkmark">✅</div>
          <h2>Welcome, Rahul.</h2>
          <p className="text-secondary">Day One starts now.</p>
          <button className="btn btn-accent" onClick={() => navigate('quiz')}>
            Let&apos;s build your Fin Story →
          </button>
        </div>
      )}
    </section>
  );
}

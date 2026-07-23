import { useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function SplashScreen() {
  const { navigate } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => navigate('onboarding'), 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <section className="screen center no-pad" onClick={() => navigate('onboarding')}>
      <div
        className="splash"
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', width: '100%', minHeight: '100vh',
          padding: 'var(--space-lg)', position: 'relative', cursor: 'pointer',
        }}
      >
        <div className="splash-logo">Day One</div>
        <p className="splash-tagline">Your Fin Story starts here.</p>
        <p className="splash-tap">Tap anywhere to begin</p>
      </div>
    </section>
  );
}

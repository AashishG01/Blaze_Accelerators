import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function SIPScreen() {
  const { navigate, sipAmount, sipStarted, dispatch, addScore } = useApp();
  const [showSuccess, setShowSuccess] = useState(false);

  const amounts = [500, 1000, 2000, 5000];

  const handleStart = () => {
    if (!sipStarted) {
      dispatch({ type: 'START_SIP' });
      addScore(10);
    }
    setShowSuccess(true);
  };

  if (showSuccess) {
    return (
      <section className="screen center">
        <div className="sip-success show">
          <div style={{ fontSize: '4rem' }}>🚀</div>
          <h2>Your first investment!</h2>
          <p className="text-secondary">
            Most people your age haven&apos;t done this yet. Your money is now working 24/7 — even while you sleep.
          </p>
          <div className="card card-credit-story" style={{ padding: 'var(--space-md) var(--space-lg)' }}>
            <div className="cu-row">
              <span className="cu-check">✅</span>
              <span className="cu-text">First SIP started</span>
              <span className="cu-points">+10 Credit Story</span>
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => navigate('goals')}>
            See my Goals →
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="screen">
      <h2 className="screen-title">Your First Investment</h2>
      <p className="screen-subtitle">AI picked this based on your profile.</p>

      <div className="sip-recommendation">
        <div className="card sip-card">
          <span className="badge badge-primary">AI Recommends</span>
          <div className="sip-name">Nifty 50 Index Fund</div>
          <div className="sip-explain">
            An index fund buys a tiny piece of India&apos;s top 50 companies. When India grows, your money grows.
          </div>
          <div className="sip-meta">
            <span className="badge badge-gold">Medium Risk</span>
            <span className="badge badge-accent">~12% p.a.</span>
          </div>
        </div>
      </div>

      <h4 style={{ marginBottom: 'var(--space-md)', color: 'var(--text-secondary)' }}>Monthly amount</h4>
      <div className="sip-amounts">
        {amounts.map(amt => (
          <button
            key={amt}
            className={`sip-amount-btn ${sipAmount === amt ? 'selected' : ''}`}
            onClick={() => dispatch({ type: 'SET_SIP_AMOUNT', amount: amt })}
          >
            ₹{amt.toLocaleString('en-IN')}
          </button>
        ))}
      </div>

      <div className="card card-credit-story" style={{ marginBottom: 'var(--space-lg)', padding: 'var(--space-md) var(--space-lg)' }}>
        <div className="cu-row">
          <span className="cu-check">⚡</span>
          <span className="cu-text">Starting SIP</span>
          <span className="cu-points">+10 Credit Story</span>
        </div>
      </div>

      <button className="btn btn-accent" onClick={handleStart}>
        Start SIP →
      </button>
    </section>
  );
}

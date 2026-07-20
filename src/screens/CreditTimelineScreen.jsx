import { useApp } from '../context/AppContext';
import CreditGauge from '../components/CreditGauge';

const entries = [
  { status: 'complete', title: 'Account opened', detail: 'Month 0', points: '+10 points' },
  { status: 'complete', title: 'First salary received', detail: 'Month 0 — ₹45,000', points: '+10 points' },
  { status: 'complete', title: 'Budget created', detail: 'Month 0 — Hosteller plan', points: '+5 points' },
  { status: 'complete', title: 'First SIP started', detail: 'Month 0 — ₹2,000/month', points: '+10 points' },
  { status: 'complete', title: 'Goals created', detail: 'Month 0 — Goa Trip, Emergency Fund, MacBook', points: '+3 points' },
  { status: 'upcoming', title: 'First budget month completed', detail: 'Month 1', points: '+8 points' },
  { status: 'upcoming', title: 'Consistent SIP payments', detail: 'Month 3', points: '+12 points' },
  { status: 'locked', title: 'CIBIL score generated', detail: "Month 3 — You'll have a real credit score" },
  { status: 'locked', title: '🔓 Pre-approved credit card', detail: 'Month 6 — No application needed' },
  { status: 'locked', title: '🔓 Pre-approved personal loan', detail: 'Month 12 — Better rates, because you have proof' },
];

export default function CreditTimelineScreen() {
  const { navigate, creditScore } = useApp();

  return (
    <section className="screen">
      <div className="credit-timeline-header">
        <CreditGauge score={creditScore} size={120} />
        <h2 style={{ marginTop: 'var(--space-lg)' }}>Your Credit Story</h2>
        <p className="text-secondary" style={{ marginTop: 'var(--space-sm)' }}>
          Every entry is a step toward financial freedom.
        </p>
      </div>

      <div className="timeline stagger">
        {entries.map((entry, i) => (
          <div key={i} className={`timeline-entry ${entry.status}`}>
            <div className="tl-title">{entry.title}</div>
            <div className="tl-detail">{entry.detail}</div>
            {entry.points && <div className="tl-points">{entry.points}</div>}
          </div>
        ))}
      </div>

      <button
        className="btn btn-accent"
        style={{ marginTop: 'var(--space-xl)' }}
        onClick={() => navigate('unlock')}
      >
        See what unlocks →
      </button>
    </section>
  );
}

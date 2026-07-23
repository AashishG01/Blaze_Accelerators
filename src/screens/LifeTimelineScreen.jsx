import { useApp } from '../context/AppContext';

const milestones = [
  {
    age: '22–24',
    phase: 'NOW',
    icon: '🚀',
    color: 'accent',
    title: 'Foundation Phase',
    subtitle: 'You are here',
    items: [
      { action: 'Build emergency fund', target: '₹1,00,000', tip: '6 months of expenses as safety net' },
      { action: 'Start first SIP', target: '₹2,000/mo', tip: 'Index fund — let compounding begin' },
      { action: 'Build credit history', target: 'CIBIL 700+', tip: 'Your Fin Story does this automatically' },
    ],
  },
  {
    age: '25–27',
    phase: 'NEXT',
    icon: '🚗',
    color: 'primary',
    title: 'Mobility & Growth',
    subtitle: 'Start planning now',
    items: [
      { action: 'Save for a vehicle', target: '₹2–4L down payment', tip: 'Start a ₹5,000/mo goal now → ready by 25' },
      { action: 'Get a credit card', target: 'Day One pre-approves at Month 6', tip: 'Use <30% limit, always pay full' },
      { action: 'Increase SIP to 20% of salary', target: '₹9,000+/mo', tip: 'Every raise → half to SIP, half to lifestyle' },
    ],
  },
  {
    age: '28–30',
    phase: 'PLAN',
    icon: '💍',
    color: 'gold',
    title: 'Life Events',
    subtitle: 'Big decisions ahead',
    items: [
      { action: 'Marriage fund', target: '₹5–10L', tip: 'Start a dedicated goal by 26 — 3 years to build' },
      { action: 'Term life insurance', target: '₹1Cr cover', tip: '₹800/mo at age 28 vs ₹1,500/mo at 35' },
      { action: 'Health insurance', target: '₹10L+ cover', tip: 'Don\'t rely on employer — get your own policy' },
    ],
  },
  {
    age: '30–33',
    phase: 'BUILD',
    icon: '🏠',
    color: 'purple',
    title: 'Home Ownership',
    subtitle: 'Your biggest asset',
    items: [
      { action: 'Home loan down payment', target: '₹10–20L (20% of property)', tip: 'Start saving ₹15,000/mo by age 27' },
      { action: 'CIBIL score 750+', target: 'Unlocks best home loan rates', tip: 'Your Fin Story builds this from Day One' },
      { action: 'Diversify investments', target: 'Equity + Debt + Gold', tip: 'Don\'t put all eggs in one basket' },
    ],
  },
  {
    age: '35–40',
    phase: 'GROW',
    icon: '👨‍👧‍👦',
    color: 'orange',
    title: 'Family & Wealth',
    subtitle: 'Secure the future',
    items: [
      { action: 'Child education fund', target: '₹25–50L over 18 years', tip: 'Start at birth — ₹5,000/mo grows to ₹35L' },
      { action: 'Upgrade home or second property', target: 'Leverage equity', tip: 'Your first home\'s value helps fund the second' },
      { action: 'Retirement corpus check', target: '₹3Cr+ by 60', tip: 'Are you on track? Review every 5 years' },
    ],
  },
  {
    age: '40+',
    phase: 'SECURE',
    icon: '🏖️',
    color: 'teal',
    title: 'Financial Freedom',
    subtitle: 'Reap what you sowed',
    items: [
      { action: 'Passive income streams', target: '₹50,000+/mo', tip: 'Rental income, dividends, debt funds' },
      { action: 'Estate planning', target: 'Will + Nominations', tip: 'Protect your family — do this by 40' },
      { action: 'Early retirement option', target: 'FIRE by 45–50', tip: 'Starting at 22 gives you 23 years of compounding' },
    ],
  },
];

export default function LifeTimelineScreen() {
  const { navigate } = useApp();

  return (
    <section className="screen">
      <h2 className="screen-title">Your Life Roadmap</h2>
      <p className="screen-subtitle">Every financial milestone, mapped to your age. Start early, stress less.</p>

      <div className="life-timeline">
        {milestones.map((milestone, i) => (
          <div
            key={i}
            className={`lt-milestone ${milestone.phase === 'NOW' ? 'lt-current' : ''}`}
          >
            {/* Age marker */}
            <div className="lt-age-marker">
              <div className={`lt-age-dot lt-dot-${milestone.color}`}>
                <span>{milestone.icon}</span>
              </div>
              <div className="lt-age-label">
                <span className="lt-age-range">Age {milestone.age}</span>
                {milestone.phase === 'NOW' && (
                  <span className="lt-phase-badge lt-badge-now">YOU ARE HERE</span>
                )}
                {milestone.phase !== 'NOW' && (
                  <span className={`lt-phase-badge lt-badge-${milestone.color}`}>{milestone.phase}</span>
                )}
              </div>
            </div>

            {/* Milestone card */}
            <div className={`card lt-card lt-card-${milestone.color}`}>
              <div className="lt-card-header">
                <h3>{milestone.title}</h3>
                <span className="lt-card-subtitle">{milestone.subtitle}</span>
              </div>

              <div className="lt-items">
                {milestone.items.map((item, j) => (
                  <div key={j} className="lt-item">
                    <div className="lt-item-top">
                      <span className="lt-item-action">{item.action}</span>
                      <span className={`lt-item-target lt-target-${milestone.color}`}>{item.target}</span>
                    </div>
                    <div className="lt-item-tip">💡 {item.tip}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Motivational closer */}
      <div className="lt-closer">
        <div className="lt-closer-icon">⏰</div>
        <p>The best time to start was yesterday.<br />The second best time is <strong>Day One</strong>.</p>
      </div>

      <button
        className="btn btn-primary"
        style={{ marginTop: 'var(--space-md)' }}
        onClick={() => navigate('dashboard-updated')}
      >
        Back to Dashboard →
      </button>
    </section>
  );
}

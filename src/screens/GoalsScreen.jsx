import { useApp } from '../context/AppContext';

const goals = [
  {
    emoji: '🏖️', name: 'Goa Trip',
    current: 0, target: 15000, months: 3, credit: '+3 Credit Story',
  },
  {
    emoji: '🚨', name: 'Emergency Fund',
    current: 0, target: 100000, months: 9, credit: '+8 Credit Story',
  },
  {
    emoji: '💻', name: 'MacBook',
    current: 0, target: 150000, months: 15, credit: '+5 Credit Story',
  },
];

export default function GoalsScreen() {
  const { navigate, creditScore } = useApp();

  return (
    <section className="screen">
      <h2 className="screen-title">Your Goals</h2>
      <p className="screen-subtitle">Every goal adds to your Credit Story.</p>

      <div className="goals-list stagger">
        {goals.map((goal, i) => (
          <div className="card goal-card" key={i}>
            <div className="goal-header">
              <div className="goal-emoji">{goal.emoji}</div>
              <div className="goal-info">
                <div className="goal-name">{goal.name}</div>
                <div className="goal-amount">
                  ₹{goal.current.toLocaleString('en-IN')} / ₹{goal.target.toLocaleString('en-IN')}
                </div>
              </div>
              <div>
                <div className="goal-credit">{goal.credit}</div>
                <div className="goal-timeline">{goal.months} months</div>
              </div>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${(goal.current / goal.target) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="goals-motivation">
        &ldquo;3 goals set. You&apos;re building a financial life, not just spending a salary.&rdquo;
      </p>

      <button className="btn btn-primary" onClick={() => navigate(creditScore >= 20 ? 'dashboard-updated' : 'dashboard')}>
        Back to Dashboard →
      </button>
    </section>
  );
}

import { useApp } from '../context/AppContext';

const categoryMeta = {
  essentials: { emoji: '🏠', label: 'Essentials', desc: 'Food, transport, phone — hostel covers the rest', credit: null },
  savings:    { emoji: '💰', label: 'Savings', desc: null, credit: '⚡ Setting this up → +5 Credit Story' },
  investments:{ emoji: '📈', label: 'Investments', desc: null, credit: '⚡ Starting a SIP → +5 Credit Story' },
  spending:   { emoji: '🎉', label: 'Spending Money', desc: 'You earned this. No guilt.', credit: null },
};

export default function BudgetScreen() {
  const { navigate, salary, budgetPcts, budgetLocked, dispatch, addScore } = useApp();

  const handleSlider = (category, value) => {
    dispatch({ type: 'SET_BUDGET_PCT', category, value: parseInt(value) });
  };

  const handleLock = () => {
    if (!budgetLocked) {
      dispatch({ type: 'LOCK_BUDGET' });
      addScore(15);
    }
    navigate('ai-chat');
  };

  const total = Object.values(budgetPcts).reduce((s, v) => s + v, 0);
  const allocatedAmt = Math.round(salary * total / 100);

  return (
    <section className="screen">
      <h2 className="screen-title">Your Budget</h2>
      <p className="screen-subtitle">Calibrated for you — not a template.</p>

      <div className="budget-ai-intro">
        <div className="ai-avatar">🤖</div>
        <div className="ai-intro-text">
          You&apos;re in a <strong>hostel</strong>, so your rent is covered by your company. That changes
          everything — your savings and investment capacity is <strong>much higher</strong> than someone paying rent.
        </div>
      </div>

      <div className="budget-categories">
        {Object.entries(categoryMeta).map(([key, meta]) => {
          const pct = budgetPcts[key];
          const amount = Math.round(salary * pct / 100);
          const fillPct = ((pct - 5) / 45) * 100; // normalize for visual

          return (
            <div className="slider-group" key={key}>
              <div className="slider-header">
                <div className="slider-label">{meta.emoji} {meta.label}</div>
                <div>
                  <span className="slider-value">₹{amount.toLocaleString('en-IN')}</span>
                  <span className="slider-pct"> ({pct}%)</span>
                </div>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                value={pct}
                onChange={e => handleSlider(key, e.target.value)}
                style={{
                  background: `linear-gradient(90deg, #4f7cff ${fillPct}%, #1a1f45 ${fillPct}%)`,
                }}
              />
              {meta.credit && <div className="slider-credit">{meta.credit}</div>}
              {meta.desc && (
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{meta.desc}</div>
              )}
            </div>
          );
        })}
      </div>

      <div className="budget-total">
        <span className="bt-label">Total allocated</span>
        <span
          className="bt-value"
          style={{ color: total === 100 ? 'var(--color-accent)' : 'var(--color-danger)' }}
        >
          ₹{allocatedAmt.toLocaleString('en-IN')} / ₹{salary.toLocaleString('en-IN')}
        </span>
      </div>

      <div className="budget-credit-reward">
        <div className="bcr-points">+15 Credit Story</div>
        <div className="bcr-text">for creating your personalized budget</div>
      </div>

      <button className="btn btn-accent" onClick={handleLock}>
        Lock in my budget →
      </button>
    </section>
  );
}

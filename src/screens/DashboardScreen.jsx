import { useState } from 'react';
import { useApp } from '../context/AppContext';
import CreditGauge from '../components/CreditGauge';

export default function DashboardScreen() {
  const { navigate, creditScore, salary, budgetPcts } = useApp();
  const [showInsight, setShowInsight] = useState(false);

  // Determine if this is the "updated" dashboard (after completing the flow)
  const isUpdated = creditScore >= 20;

  const formattedBalance = isUpdated
    ? '₹' + salary.toLocaleString('en-IN')
    : '₹0.00';

  // Determine spender type based on budget allocation
  const spendingPct = budgetPcts.spending || 25;
  const savingsPct = budgetPcts.savings || 25;
  const investmentPct = budgetPcts.investments || 20;

  let spenderType, spenderEmoji, spenderDesc;
  if (savingsPct + investmentPct >= 45) {
    spenderType = '🐢 Cautious Starter';
    spenderEmoji = '🐢';
    spenderDesc = 'You prioritize saving over spending — that\'s rare for a first salary. Your future self will thank you.';
  } else if (spendingPct >= 35) {
    spenderType = '⚡ Free Spender';
    spenderEmoji = '⚡';
    spenderDesc = 'You like to enjoy your earnings — nothing wrong with that, but balance is key to building your score.';
  } else {
    spenderType = '⚖️ Balanced Builder';
    spenderEmoji = '⚖️';
    spenderDesc = 'You\'re splitting wisely across needs and wants. A solid foundation for your credit journey.';
  }

  const handleCardClick = (e) => {
    e.stopPropagation();
    setShowInsight(!showInsight);
  };

  return (
    <section className="screen">
      {/* Header */}
      <div className="dash-header">
        <div className="dash-greeting">
          <h2>Hey Rahul 👋</h2>
          <div className="dash-date">{isUpdated ? 'Day One — Month 1' : 'Your Day One'}</div>
        </div>
        <div className="dash-notif">🔔</div>
      </div>

      {/* CREDIT STORY — THE TOP CARD */}
      <div
        className={`card card-credit-story cs-pulse ${showInsight ? 'insight-active' : ''}`}
        style={{ marginBottom: 'var(--space-lg)', cursor: 'pointer', position: 'relative' }}
        onClick={handleCardClick}
      >
        <div className="credit-story-hero">
          <CreditGauge score={creditScore} size={80} />
          <div className="cs-hero-info">
            <h3>YOUR CREDIT STORY</h3>
            <div className="cs-status">
              {isUpdated
                ? `Score: ${creditScore} — Great start! 🌱`
                : `Score: ${creditScore} — Your story starts today`}
            </div>
            <div className="cs-next">
              {isUpdated
                ? '📈 Next: Complete first budget month (+8)'
                : '⏳ Entry #1 is waiting — receive your first salary'}
            </div>
          </div>
        </div>

        {/* Tap hint — highlighted */}
        <div className={`cs-tap-hint ${showInsight ? '' : 'cs-tap-glow'}`}>
          <span className="cs-tap-pill">
            {showInsight ? '▲ Tap to close' : '✨ Tap for insights'}
          </span>
        </div>

        {/* Credit Insight Popup */}
        <div className={`credit-insight-popup ${showInsight ? 'open' : ''}`}>
          {/* Spender Type */}
          <div className="ci-spender-section">
            <div className="ci-spender-badge">{spenderEmoji}</div>
            <div className="ci-spender-info">
              <div className="ci-spender-label">YOUR SPENDER TYPE</div>
              <div className="ci-spender-type">{spenderType}</div>
            </div>
          </div>
          <p className="ci-spender-desc">{spenderDesc}</p>

          <div className="ci-divider" />

          {/* How to Improve */}
          <div className="ci-section">
            <div className="ci-section-header">
              <span className="ci-section-icon">📈</span>
              <span className="ci-section-title">Boost Your Score</span>
            </div>
            <div className="ci-tips">
              <div className="ci-tip ci-tip-good">
                <span className="ci-tip-icon">✅</span>
                <span>Stick to your budget for 30 days straight</span>
                <span className="ci-tip-points">+8</span>
              </div>
              <div className="ci-tip ci-tip-good">
                <span className="ci-tip-icon">✅</span>
                <span>Keep your SIP active — don&apos;t skip a month</span>
                <span className="ci-tip-points">+12</span>
              </div>
              <div className="ci-tip ci-tip-good">
                <span className="ci-tip-icon">✅</span>
                <span>Hit your emergency fund goal of ₹10,000</span>
                <span className="ci-tip-points">+8</span>
              </div>
            </div>
          </div>

          <div className="ci-divider" />

          {/* What to Avoid */}
          <div className="ci-section">
            <div className="ci-section-header">
              <span className="ci-section-icon">🚫</span>
              <span className="ci-section-title">Avoid These</span>
            </div>
            <div className="ci-tips">
              <div className="ci-tip ci-tip-bad">
                <span className="ci-tip-icon">❌</span>
                <span>Overspending past your budget allocation</span>
                <span className="ci-tip-penalty">−5</span>
              </div>
              <div className="ci-tip ci-tip-bad">
                <span className="ci-tip-icon">❌</span>
                <span>Skipping SIP payments or cancelling early</span>
                <span className="ci-tip-penalty">−10</span>
              </div>
              <div className="ci-tip ci-tip-bad">
                <span className="ci-tip-icon">❌</span>
                <span>Dipping into savings for non-essentials</span>
                <span className="ci-tip-penalty">−3</span>
              </div>
            </div>
          </div>

          {/* View full timeline link */}
          <button
            className="btn btn-primary btn-sm"
            style={{ marginTop: 'var(--space-md)' }}
            onClick={(e) => { e.stopPropagation(); navigate('credit-timeline'); }}
          >
            View Full Credit Timeline →
          </button>
        </div>
      </div>

      {/* Popup overlay to close */}
      {showInsight && (
        <div
          className="insight-overlay"
          onClick={() => setShowInsight(false)}
        />
      )}

      {/* Balance Card */}
      <div className="card balance-card">
        <div className="balance-label">Available Balance</div>
        <div className="balance-amount">{formattedBalance}</div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions stagger">
        <div className="quick-action" onClick={() => navigate('budget')}
          style={isUpdated ? { borderColor: 'rgba(0,214,143,0.3)' } : undefined}>
          <div className={`qa-icon ${isUpdated ? 'green' : 'blue'}`}>{isUpdated ? '✅' : '📊'}</div>
          Budget
        </div>
        <div className="quick-action" onClick={() => navigate('ai-chat')}>
          <div className="qa-icon green">🤖</div>
          AI Coach
        </div>
        <div className="quick-action" onClick={() => navigate('goals')}>
          <div className="qa-icon gold">🎯</div>
          Goals
        </div>
      </div>

      {/* Small Cards */}
      <div className="dash-small-cards stagger">
        <div className="card dash-small-card" onClick={() => navigate('progress')} style={{ cursor: 'pointer' }}>
          <div className="dsc-icon" style={{ background: 'rgba(167,139,250,0.15)' }}>💪</div>
          <div className="dsc-content">
            <div className="dsc-title">Financial Health</div>
            <div className="dsc-detail">
              {isUpdated ? '72/100 — Good start!' : 'Complete your first month to unlock'}
            </div>
          </div>
          <div className="dsc-arrow">›</div>
        </div>

        <div className="card dash-small-card" onClick={() => navigate('sip')} style={{ cursor: 'pointer' }}>
          <div className="dsc-icon" style={{ background: isUpdated ? 'rgba(0,214,143,0.15)' : 'rgba(79,124,255,0.15)' }}>
            {isUpdated ? '✅' : '📈'}
          </div>
          <div className="dsc-content">
            <div className="dsc-title">{isUpdated ? '₹2,000/month SIP' : 'Investments'}</div>
            <div className="dsc-detail">
              {isUpdated ? 'Nifty 50 Index Fund — Active' : 'Start your first SIP →'}
            </div>
          </div>
          <div className="dsc-arrow">›</div>
        </div>

        <div className="card dash-small-card" onClick={() => navigate('life-timeline')} style={{ cursor: 'pointer' }}>
          <div className="dsc-icon" style={{ background: 'rgba(255, 209, 102, 0.15)' }}>🗺️</div>
          <div className="dsc-content">
            <div className="dsc-title">Life Roadmap</div>
            <div className="dsc-detail">
              {isUpdated ? 'Age 22–40+ financial milestones' : 'Your future, mapped by age →'}
            </div>
          </div>
          <div className="dsc-arrow">›</div>
        </div>
      </div>

      {/* Simulate salary button (only on initial dashboard) */}
      {!isUpdated && (
        <button
          className="btn btn-accent"
          style={{ marginTop: 'var(--space-xl)' }}
          onClick={() => navigate('celebration')}
        >
          💸 Simulate: Receive First Salary
        </button>
      )}

      {/* View Progress (only on updated dashboard) */}
      {isUpdated && (
        <button
          className="btn btn-primary"
          style={{ marginTop: 'var(--space-lg)' }}
          onClick={() => navigate('progress')}
        >
          View Progress &amp; Badges →
        </button>
      )}
    </section>
  );
}

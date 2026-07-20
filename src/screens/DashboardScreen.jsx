import { useApp } from '../context/AppContext';
import CreditGauge from '../components/CreditGauge';

export default function DashboardScreen() {
  const { navigate, creditScore, salary } = useApp();

  // Determine if this is the "updated" dashboard (after completing the flow)
  const isUpdated = creditScore >= 20;

  const formattedBalance = isUpdated
    ? '₹' + salary.toLocaleString('en-IN')
    : '₹0.00';

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
        className="card card-credit-story cs-pulse"
        style={{ marginBottom: 'var(--space-lg)', cursor: 'pointer' }}
        onClick={() => navigate('credit-timeline')}
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
      </div>

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
